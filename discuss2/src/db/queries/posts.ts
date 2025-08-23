import { Post } from "@prisma/client";
import { prisma } from "..";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export type PostWithDataV1 = Awaited<ReturnType<typeof fetchPostsByTopicSlug >>[number]

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return prisma.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true },
      },
      _count: { select: { comments: true } },
    },
  } as any) as Promise<PostWithData[]>;
}

export function fetchTopPosts():Promise<PostWithData[]>{

    return prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 5,
        include: {
            topic: {
              select: { slug: true },
            },
            user: {
              select: { name: true , image:true },
            },
            _count: { select: { comments: true } },
          },
    } as any) as Promise<PostWithData[]>

}


export function fetchPostsBySearchTerm(searchTerm:string):Promise<PostWithData[]>{
    return prisma.post.findMany({
        where: {
            OR: [{title: {
                contains: searchTerm
            }},{content: { contains: searchTerm}}],
        },
        include: {
            topic: {
              select: { slug: true },
            },
            user: {
              select: { name: true , image:true },
            },
            _count: { select: { comments: true } },
          },
    } as any) as Promise<PostWithData[]>
}

