'use server'

import { db } from "@/db"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function editSnippet(id: number, snippet: string) {

    console.log('edit snippet called')

    await db.snippet.update({
        where: {
            id: id
        },
        data: {
            code: snippet
        }
    });
    redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {

    await db.snippet.delete({
        where: {
            id: id
        }
    });

    revalidatePath('/');
    redirect(`/`);
}


export async function createSnippet(formState: { message: string }, formData: FormData) {

    try {
        const title = formData.get("title") as string;

        if (title.length < 3) {
            return { message: "Title must be at least 3 characters long" }
        }

        const code = formData.get("code") as string;

        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        })
        console.log("snippet created", snippet)
    } catch (err: unknown) {
        console.log(err);
        return { message: "Something went wrong" }
    }
    revalidatePath('/');
    redirect('/');
}