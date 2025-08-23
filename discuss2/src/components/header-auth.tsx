'use client'

import { Popover, PopoverTrigger, Avatar, PopoverContent, Button, NavbarItem } from "@heroui/react";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import * as action from '@/actions'


export function HeaderAuth() {

    const session = useSession();

    let authContent: ReactNode;

    if(session.status === 'loading'){
        authContent = null
    }else if (session.data?.user) {
        authContent = <Popover placement='left' ><PopoverTrigger><Avatar src={session.data.user.image || ''} /></PopoverTrigger>
            <PopoverContent className='cursor-pointer' >
                <div className='p-4' >
                    <form action={action.signOut} >
                        <Button type='submit' >SignOut</Button>

                    </form>
                </div>
            </PopoverContent>

        </Popover>
    } else {
        authContent = (<>
            <NavbarItem className='space-x-2 flex ' >
                <form action={action.signIn} >
                    <Button type='submit' color='secondary' variant='bordered' >SignIn</Button>
                </form>

            </NavbarItem>
        </>)
    }

    return authContent;


}