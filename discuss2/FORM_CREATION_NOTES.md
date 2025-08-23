# Form Creation and Usage Notes - Next.js with Server Actions

## Overview
This repository demonstrates modern form handling in Next.js 15 using Server Actions, React 19's `useActionState`, and HeroUI components. The pattern combines client-side form handling with server-side validation and processing.

## Key Technologies Used
- **Next.js 15** - App Router with Server Actions
- **React 19** - `useActionState` hook for form state management
- **HeroUI** - UI component library for form elements
- **Zod** - Schema validation
- **Prisma** - Database operations
- **NextAuth** - Authentication

## Form Architecture Pattern

### 1. Server Action Structure
```typescript
// actions/create-topic.ts
'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 1. Define validation schema
const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, {
        message: 'Must be lowercase letters or dashes without space'
    }),
    description: z.string().min(10, {
        message: 'Must be at least 10 characters'
    })
});

// 2. Define form state type
export type CreateTopicFormState = {
    errors: {
        name?: string[],
        description?: string[]
        _form?: string[]
    }
};

// 3. Create server action
export async function createTopic(
    formState: CreateTopicFormState, 
    formData: FormData
): Promise<CreateTopicFormState> {
    // Validation
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    // Authentication check
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be logged in to create a topic']
            }
        };
    }

    // Database operation
    try {
        const topic = await prisma.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            }
        });
        
        // Revalidate and redirect
        revalidatePath(paths.home());
        redirect(paths.topicShow(topic.slug));
    } catch (err: any) {
        return {
            errors: {
                _form: [err.message || 'Something went wrong']
            }
        };
    }
}
```

### 2. Client-Side Form Component
```typescript
// components/topics/topic-create-form.tsx
'use client'

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@heroui/react";
import { startTransition, useActionState } from "react";
import * as action from '@/actions';

export default function TopicCreateForm() {
    // 1. Use useActionState hook
    const [result, formAction, isPending] = useActionState(action.createTopic, { errors: {} });

    // 2. Handle form submission
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            formAction(formData);
        });
    }

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a topic</h3>
                        
                        {/* Input with error handling */}
                        <Input 
                            name="name" 
                            label="name" 
                            placeholder="Name" 
                            labelPlacement="outside"
                            errorMessage={result.errors.name?.join(', ')}
                            isInvalid={!!result.errors.name}
                        />
                        
                        {/* Textarea with error handling */}
                        <Textarea 
                            name="description" 
                            label="description" 
                            labelPlacement="outside" 
                            placeholder="Describe your topic" 
                            isInvalid={!!result.errors.description}
                            errorMessage={result.errors.description?.join(', ')}
                        />
                        
                        {/* Form-level errors */}
                        {result.errors._form && (
                            <p className="text-red-500">
                                {result.errors._form.join(', ')}
                            </p>
                        )}
                        
                        {/* Submit button with loading state */}
                        <Button 
                            type="submit" 
                            color="primary" 
                            isLoading={isPending}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
```

### 3. Alternative Form Button Component
```typescript
// components/common/form-button.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@heroui/react";

export default function FormButton({
    children,
}: {
    children: React.ReactNode;
}) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" isLoading={pending}>
            {children}
        </Button>
    );
}
```

## Key Patterns and Best Practices

### 1. Form State Management
- Use `useActionState` hook for managing form state, errors, and loading states
- Initialize with empty errors object: `{ errors: {} }`
- Handle both field-specific and form-level errors

### 2. Validation Strategy
- Use Zod schemas for server-side validation
- Return structured error objects with field names as keys
- Handle validation errors before processing business logic

### 3. Error Handling
- **Field-level errors**: Display next to specific form fields
- **Form-level errors**: Display at form level (e.g., authentication errors)
- **Database errors**: Catch and return user-friendly messages

### 4. Loading States
- Use `isPending` from `useActionState` for submit button loading
- Alternative: Use `useFormStatus` hook for more granular control
- Wrap form submission in `startTransition` for better UX

### 5. Form Submission
- Prevent default form behavior
- Create FormData from form element
- Use `startTransition` to wrap server action call

### 6. UI Components
- Use HeroUI components for consistent styling
- Implement proper error states with `isInvalid` and `errorMessage` props
- Use `noValidate` on form to prevent browser validation

### 7. Authentication Integration
- Check session in server actions
- Return appropriate error messages for unauthenticated users
- Redirect after successful operations

### 8. Database Operations
- Use Prisma for database operations
- Handle database errors gracefully
- Revalidate relevant paths after successful operations

### 9. Navigation
- Use `redirect()` for programmatic navigation after form submission
- Use `revalidatePath()` to refresh cached data

## File Organization
```
src/
├── actions/           # Server actions
│   ├── index.ts      # Export all actions
│   ├── create-topic.ts
│   ├── create-post.ts
│   └── create-comment.ts
├── components/
│   ├── common/       # Reusable form components
│   │   └── form-button.tsx
│   └── topics/       # Feature-specific forms
│       └── topic-create-form.tsx
└── app/              # Pages using forms
```

## Dependencies Required
```json
{
  "dependencies": {
    "@heroui/react": "^2.8.1",
    "next": "15.4.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "zod": "^4.0.17",
    "@prisma/client": "^6.13.0",
    "next-auth": "^5.0.0-beta.29"
  }
}
```

## Common Gotchas
1. **Server Actions**: Must be marked with `'use server'` directive
2. **Form Data**: Use `FormData` API, not JSON for form submission
3. **Error Handling**: Always handle both validation and runtime errors
4. **Loading States**: Use appropriate loading indicators for better UX
5. **Validation**: Server-side validation is crucial for security
6. **Authentication**: Always check user session in server actions
7. **Revalidation**: Remember to revalidate paths after data changes

## Testing Considerations
- Test form validation with various inputs
- Test authentication requirements
- Test error scenarios (network, database, validation)
- Test loading states and user feedback
- Test form submission and navigation flow
