'use server'

import type { Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import paths from '@/path.helper'
import { prisma } from '@/db'
import { auth } from '@/auth'
import { z } from 'zod'

const createPostSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    topicSlug: z.string().min(1, 'Topic slug is required'),
})

interface CreatePostFormState {
    errors: {
        title?: string[]
        content?: string[]
        topicSlug?: string[]
        _form?: string[]
    }
}

export async function createPost(
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    // 1. Validate input
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        topicSlug: formData.get('topicSlug'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // 2. Check authentication
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['You must be logged in to create a post']
            }
        }
    }

    // 3. Get topic by slug
    let post: Post;
    try {
        const topic = await prisma.topic.findUnique({
            where: { slug: result.data.topicSlug }
        });

        if (!topic) {
            return {
                errors: {
                    _form: ['Topic not found']
                }
            }
        }

        // 4. Create post in database
        post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        });

      
    } catch (error: any) {
        return {
            errors: {
                _form: [error.message || 'Failed to create post']
            }
        }
    }

      // 5. Revalidate and redirect
      revalidatePath(paths.topicShow(result.data.topicSlug));
      redirect(paths.postShow(result.data.topicSlug, post.id));



}