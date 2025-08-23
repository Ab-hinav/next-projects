'use server'

import { auth } from '@/auth';
import {z} from 'zod';
import type { Topic } from '@prisma/client';
import {prisma} from '@/db';
import paths from '@/path.helper';
import { Redirect } from 'next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/,{message : 'Must be lowercase letters or dashes without space'}),
    description : z.string().min(10,{message : 'Must be at least 10 characters'})
})

export type CreateTopicFormState = {
    errors : {
        name? : string[],
        description? : string[]
        _form?: string[]
    }

}




export async function createTopic( formState:CreateTopicFormState, formData:FormData):Promise<CreateTopicFormState>{

    const result = createTopicSchema.safeParse({
        name : formData.get('name'),
        description : formData.get('description')
    })

    if(!result.success){
        return {
            errors : result.error.flatten().fieldErrors
        }
    }

    const session = await auth()

    if(!session || !session.user){
        return {
            errors : {
                _form : ['You must be logged in to create a topic']
            }
        }
    }


    let topic:Topic;

    try{

       topic = await prisma.topic.create({
            data: {
                slug : result.data.name,
                description : result.data.description,
            }
        })


    }catch(err:any){

        if(err instanceof Error){
            return {
                errors : {
                    _form : [err.message]
                }
            }
        }else{

            return {
                errors : {
                    _form : ['Something went wrong']
                }
            }

        }


    }
    revalidatePath(paths.home())
    redirect(paths.topicShow(topic.slug))


// Todo revalidate the home page


}