'use client'

import { Snippet } from "@/generated/prisma"
import { Editor } from "@monaco-editor/react"
import { useDebounce } from "@uidotdev/usehooks"
import { startTransition, useState } from "react"
import Button from "./Button"
import { editSnippet } from "@/app/actions"

interface SnippetEditFormProp {

    snippet: Snippet | null

}

export default function SnippitEditForm({ snippet }: SnippetEditFormProp) {

    const handleChange = (value:string= "")=>{

        console.log(value);
        setData(value)

    }
    const [data,setData] = useState('');

    const debouncedVal = useDebounce(data,500)

    
    const editSnippetAction = ()=>{

        console.log("edit snippet action");
        console.log(debouncedVal);

        startTransition(async ()=>{
            if(snippet?.id)
                await editSnippet(snippet.id,debouncedVal);
        })
        
    }

    // const 

    

    return <div className="p-3" >
        <Editor
            height="40vh"
            theme="vs-dark"
            language="javascript"
            options={{
                minimap: {
                    enabled: false
                }
            }}
            onChange={handleChange}
            defaultValue={snippet?.code}
        />
        <Button variant="active" onClick={editSnippetAction} >Submit</Button>
    </div>

}