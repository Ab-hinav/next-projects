# Form Boilerplate - Next.js with Server Actions

## Quick Start Boilerplate

### 1. Server Action Template
```typescript
// actions/sample-form.ts
'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/db';

// Validation Schema
const sampleFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    category: z.enum(['tech', 'design', 'business']),
    tags: z.string().optional(),
    isPublished: z.boolean().default(false)
});

// Form State Type
export type SampleFormState = {
    errors: {
        title?: string[];
        content?: string[];
        category?: string[];
        tags?: string[];
        _form?: string[];
    };
    success?: boolean;
};

// Server Action
export async function handleSampleForm(
    formState: SampleFormState,
    formData: FormData
): Promise<SampleFormState> {
    // 1. Validate input
    const result = sampleFormSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        tags: formData.get('tags'),
        isPublished: formData.get('isPublished') === 'true'
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    // 2. Check authentication
    const session = await auth();
    if (!session?.user) {
        return {
            errors: {
                _form: ['You must be logged in to submit this form']
            }
        };
    }

    // 3. Process data
    try {
        // Database operation example
        const post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                category: result.data.category,
                tags: result.data.tags,
                isPublished: result.data.isPublished,
                authorId: session.user.id
            }
        });

        // 4. Revalidate and redirect
        revalidatePath('/posts');
        redirect(`/posts/${post.id}`);
    } catch (error: any) {
        return {
            errors: {
                _form: [error.message || 'Something went wrong']
            }
        };
    }
}
```

### 2. Client Form Component Template
```typescript
// components/forms/sample-form.tsx
'use client'

import { useState } from 'react';
import { startTransition, useActionState } from 'react';
import { 
    Button, 
    Input, 
    Textarea, 
    Select, 
    SelectItem,
    Checkbox,
    Card,
    CardBody,
    CardHeader,
    Divider
} from "@heroui/react";
import { handleSampleForm } from '@/actions/sample-form';

export default function SampleForm() {
    const [result, formAction, isPending] = useActionState(
        handleSampleForm, 
        { errors: {} }
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold">Create New Post</h2>
                <p className="text-gray-600">Fill out the form below to create a new post</p>
            </CardHeader>
            <Divider />
            <CardBody>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Title Field */}
                    <Input
                        name="title"
                        label="Title"
                        placeholder="Enter post title"
                        labelPlacement="outside"
                        isRequired
                        isInvalid={!!result.errors.title}
                        errorMessage={result.errors.title?.join(', ')}
                        classNames={{
                            input: "text-lg",
                            inputWrapper: "h-12"
                        }}
                    />

                    {/* Content Field */}
                    <Textarea
                        name="content"
                        label="Content"
                        placeholder="Write your post content here..."
                        labelPlacement="outside"
                        isRequired
                        minRows={4}
                        isInvalid={!!result.errors.content}
                        errorMessage={result.errors.content?.join(', ')}
                        classNames={{
                            input: "min-h-[120px]"
                        }}
                    />

                    {/* Category Field */}
                    <Select
                        name="category"
                        label="Category"
                        labelPlacement="outside"
                        placeholder="Select a category"
                        isRequired
                        isInvalid={!!result.errors.category}
                        errorMessage={result.errors.category?.join(', ')}
                    >
                        <SelectItem key="tech" value="tech">Technology</SelectItem>
                        <SelectItem key="design" value="design">Design</SelectItem>
                        <SelectItem key="business" value="business">Business</SelectItem>
                    </Select>

                    {/* Tags Field */}
                    <Input
                        name="tags"
                        label="Tags (optional)"
                        placeholder="Enter tags separated by commas"
                        labelPlacement="outside"
                        isInvalid={!!result.errors.tags}
                        errorMessage={result.errors.tags?.join(', ')}
                        description="Separate multiple tags with commas"
                    />

                    {/* Checkbox Field */}
                    <Checkbox
                        name="isPublished"
                        value="true"
                        defaultSelected={false}
                    >
                        Publish immediately
                    </Checkbox>

                    {/* Form-level Errors */}
                    {result.errors._form && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">
                                {result.errors._form.join(', ')}
                            </p>
                        </div>
                    )}

                    {/* Success Message */}
                    {result.success && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-600 text-sm">
                                Form submitted successfully!
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={isPending}
                            className="flex-1"
                        >
                            {isPending ? 'Creating...' : 'Create Post'}
                        </Button>
                        <Button
                            type="button"
                            variant="bordered"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
```

### 3. Reusable Form Button Component
```typescript
// components/common/form-button.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@heroui/react";

interface FormButtonProps extends Omit<ButtonProps, 'type'> {
    children: React.ReactNode;
    loadingText?: string;
}

export default function FormButton({ 
    children, 
    loadingText = "Loading...",
    ...props 
}: FormButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button 
            type="submit" 
            isLoading={pending}
            {...props}
        >
            {pending ? loadingText : children}
        </Button>
    );
}
```

### 4. Form Validation Hook
```typescript
// hooks/use-form-validation.ts
import { useState, useCallback } from 'react';

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
}

interface ValidationRules {
    [key: string]: ValidationRule;
}

export function useFormValidation(rules: ValidationRules) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = useCallback((name: string, value: string) => {
        const rule = rules[name];
        if (!rule) return null;

        // Required check
        if (rule.required && !value.trim()) {
            return `${name} is required`;
        }

        // Min length check
        if (rule.minLength && value.length < rule.minLength) {
            return `${name} must be at least ${rule.minLength} characters`;
        }

        // Max length check
        if (rule.maxLength && value.length > rule.maxLength) {
            return `${name} must be no more than ${rule.maxLength} characters`;
        }

        // Pattern check
        if (rule.pattern && !rule.pattern.test(value)) {
            return `${name} format is invalid`;
        }

        // Custom validation
        if (rule.custom) {
            return rule.custom(value);
        }

        return null;
    }, [rules]);

    const validateForm = useCallback((formData: FormData) => {
        const newErrors: Record<string, string> = {};
        
        Object.keys(rules).forEach(fieldName => {
            const value = formData.get(fieldName) as string;
            const error = validateField(fieldName, value);
            if (error) {
                newErrors[fieldName] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [rules, validateField]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    return {
        errors,
        validateField,
        validateForm,
        clearErrors
    };
}
```

### 5. Form with Custom Validation
```typescript
// components/forms/validated-form.tsx
'use client'

import { useState } from 'react';
import { Input, Button, Card, CardBody } from "@heroui/react";
import { useFormValidation } from '@/hooks/use-form-validation';

export default function ValidatedForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, validateForm, clearErrors } = useFormValidation({
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            custom: (value) => {
                if (!value.includes('@')) return 'Email must contain @';
                return null;
            }
        },
        password: {
            required: true,
            minLength: 8,
            custom: (value) => {
                if (!/(?=.*[a-z])/.test(value)) return 'Password must contain lowercase letter';
                if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain uppercase letter';
                if (!/(?=.*\d)/.test(value)) return 'Password must contain number';
                return null;
            }
        },
        confirmPassword: {
            required: true,
            custom: (value) => {
                const password = document.querySelector('input[name="password"]') as HTMLInputElement;
                if (password && value !== password.value) {
                    return 'Passwords do not match';
                }
                return null;
            }
        }
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();
        
        const formData = new FormData(event.currentTarget);
        const isValid = validateForm(formData);
        
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', Object.fromEntries(formData));
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                    />
                    
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password}
                    />
                    
                    <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        isInvalid={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword}
                    />
                    
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
```

### 6. Modal Form Template
```typescript
// components/forms/modal-form.tsx
'use client'

import { useState } from 'react';
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
    Input,
    Textarea,
    useDisclosure
} from "@heroui/react";
import { startTransition, useActionState } from 'react';
import { handleSampleForm } from '@/actions/sample-form';

export default function ModalForm() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [result, formAction, isPending] = useActionState(
        handleSampleForm, 
        { errors: {} }
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            formAction(formData);
        });
    };

    const handleClose = () => {
        onClose();
        // Reset form state if needed
    };

    return (
        <>
            <Button color="primary" onPress={onOpen}>
                Open Modal Form
            </Button>
            
            <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Create New Post</ModalHeader>
                        <ModalBody className="space-y-4">
                            <Input
                                name="title"
                                label="Title"
                                placeholder="Enter post title"
                                isRequired
                                isInvalid={!!result.errors.title}
                                errorMessage={result.errors.title?.join(', ')}
                            />
                            
                            <Textarea
                                name="content"
                                label="Content"
                                placeholder="Write your post content..."
                                isRequired
                                minRows={3}
                                isInvalid={!!result.errors.content}
                                errorMessage={result.errors.content?.join(', ')}
                            />
                            
                            {result.errors._form && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">
                                        {result.errors._form.join(', ')}
                                    </p>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="button" 
                                variant="bordered" 
                                onPress={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                color="primary" 
                                isLoading={isPending}
                            >
                                Create Post
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
```

### 7. Page Template Using Form
```typescript
// app/posts/new/page.tsx
import SampleForm from '@/components/forms/sample-form';

export default function NewPostPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create New Post</h1>
                <p className="text-gray-600 mt-2">
                    Share your thoughts with the community
                </p>
            </div>
            
            <SampleForm />
        </div>
    );
}
```

### 8. Actions Index File
```typescript
// actions/index.ts
export { handleSampleForm } from './sample-form';
export { signIn } from './sign-in';
export { signOut } from './sign-out';
// Export all your actions here
```

## Usage Instructions

1. **Copy the server action template** and modify for your specific use case
2. **Create the client component** using the form template
3. **Add validation rules** using Zod schemas
4. **Handle errors** at both field and form levels
5. **Add loading states** for better UX
6. **Test thoroughly** with various scenarios

## Key Features of This Boilerplate

- ✅ **Type-safe validation** with Zod
- ✅ **Server-side processing** with Server Actions
- ✅ **Client-side UX** with loading states
- ✅ **Error handling** at multiple levels
- ✅ **Authentication integration**
- ✅ **Database operations** with Prisma
- ✅ **Reusable components**
- ✅ **Custom validation hooks**
- ✅ **Modal form support**
- ✅ **Responsive design**

This boilerplate provides a solid foundation for building forms in Next.js 15 with modern patterns and best practices.
