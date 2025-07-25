import Button from "@/components/Button";
import { db } from "@/db";
import { notFound } from 'next/navigation'
import Link from "next/link";
import { deleteSnippet } from "@/app/actions";

export default async function ShowSnippetPage({ params }: { params: { Id: string } }) {


    const { Id } = await params;

    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(Id) },
    });

    if (!snippet) {
        return notFound()
    }


    const handleDeleteSnippet = deleteSnippet.bind(null,snippet?.id);

    return <div className="m-3">
        <nav className="flex justify-between w-full" >
            <h1>PrintFiles</h1>
            <div>
                <Link href={`/snippets/${Id}/edit`}  >Edit</Link>
                <form action={handleDeleteSnippet}>
                  <Button type="submit" variant="active">Delete</Button>
                </form>

            </div>
        </nav>
        <pre className="bg-gray-700 p-3 border rounded" >
            <code>
                {snippet.code}
            </code>

        </pre>

    </div>;
}