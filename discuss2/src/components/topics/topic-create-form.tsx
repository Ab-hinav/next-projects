'use client'

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@heroui/react";
import * as action from '@/actions'

import { startTransition, useActionState } from "react";



export default function TopicCreateForm(){

    const [result,formAction,isPending] = useActionState(action.createTopic,{errors:{}})



    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

    return <Popover placement="left" >
            <PopoverTrigger>
                <Button color="primary" >Create Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate >
                    <div className="flex flex-col gap-4 p-4 w-80" >
                        <h3 className="text-lg" >Create a topic</h3>
                        <Input name="name" label="name" placeholder="Name" labelPlacement="outside"
                        errorMessage={result.errors.name?.join(', ')}
                        isInvalid={!!result.errors.name}
                        ></Input>
                        <Textarea 
                        name="description" label="description" labelPlacement="outside" placeholder="Describe your topic" 
                        isInvalid={!!result.errors.description}
                        errorMessage={result.errors.description?.join(', ')}
                        ></Textarea>
                        
                        {result.errors._form && <p className="text-red-500" >{result.errors._form.join(', ')}</p>}
                        <Button type="submit" color="primary" isLoading={isPending}>Save</Button>
                    </div>
                </form>
            </PopoverContent>
    </Popover>
}