'use client'
import { startTransition, useActionState } from "react";
import * as actions from "@/app/actions"

export default function SnippetCreatePage() {


    const [formState, action] = useActionState(actions.createSnippet, { message: "" })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }


    return <form onSubmit={handleSubmit} >
        <h3 className="font-bold m-3">Create a Sniipet</h3>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4" >
                <label className="w-12" htmlFor="title">Title</label>
                <input className="border rounded p-2 w-full" id="title" name="title" ></input>
            </div>
            <div className="flex gap-4" >
                <label className="w-12" htmlFor="code">Code</label>
                <textarea className="border rounded p-2 w-full" id="code" name="code" ></textarea>
            </div>

            {formState.message ? (
                <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
                    {formState.message}
                </div>
            ) : null}

            <button className="bg-blue-500 text-white p-2 rounded" type="submit">Create</button>

        </div>


    </form>



}