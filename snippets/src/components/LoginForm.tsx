'use client'

import { FormEvent, useState } from "react"
import Button from "./Button"


export default function LoginForm() {


    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Form submitted",age)

    }

    const [age, setAge] = useState('')


    const variant = age.length>0 ? "active" : "secondary" as const;

    return <div className="mx-auto text-center flex-col space-y-10" >
        <h3 className="mx-auto text-2xl font-bold " >Verify your Age</h3>
        <form onSubmit={handleForm} className="flex-col" >
            <div className="flex-col" >
                <div className="mb-2">
                    <label className="text-center text-sm" >Please confirm your birth year. This data will not be stored</label>
                </div>
                <input value={age} onChange={(e) => setAge(e.target.value)} className="p-3 m-1 bg-blue-800 rounded border-white border" ></input>
            </div>

            <Button type="submit" variant={variant} classNames="mx-auto px-10" >Continue</Button>
        </form>
    </div>





}