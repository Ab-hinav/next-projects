'use client'

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@heroui/react";
import * as actions from '@/actions'
import { startTransition, useActionState } from "react";

interface PostCreateFormProps {
    topicSlug: string;
}

export default function PostCreateForm({ topicSlug }: PostCreateFormProps){
    const [result, formAction, isPending] = useActionState(actions.createPost, { errors: {} });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // Add topicSlug to form data
        formData.append('topicSlug', topicSlug);
        console.log('Form data:', Object.fromEntries(formData));
        startTransition(() => {
            formAction(formData);
        });
    }

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a post</h3>
                        
                        {/* Title field - Fixed error mapping */}
                        <Input 
                            name="title" 
                            placeholder="Title" 
                            label="Title"
                            labelPlacement="outside"
                            isRequired
                            errorMessage={result.errors.title?.join(', ')}
                            isInvalid={!!result.errors.title}
                        />
                        
                        {/* Content field - Fixed error mapping */}
                        <Textarea 
                            name="content" 
                            placeholder="Content" 
                            label="Content"
                            labelPlacement="outside"
                            isRequired
                            minRows={3}
                            isInvalid={!!result.errors.content}
                            errorMessage={result.errors.content?.join(', ')} 
                        />
                        
                        {/* Form-level errors */}
                        {result.errors._form && (
                            <p className="text-red-500 text-sm">
                                {result.errors._form.join(', ')}
                            </p>
                        )}
                        
                        <Button 
                            type="submit" 
                            color="primary" 
                            isLoading={isPending}
                        >
                            {isPending ? 'Creating...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}