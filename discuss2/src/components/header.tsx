import { Avatar, Button, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import Link from 'next/link'
import { HeaderAuth } from './header-auth'
import SearchInput from './search-input'
import { Suspense } from 'react'


export default async function Header(){

    

    return <Navbar className='shadow mb-6' >
        <NavbarBrand>

            <Link href="/" className='font-bold' >Discuss</Link>
        </NavbarBrand>

        <NavbarContent justify='center' >
        <Suspense>
            <SearchInput></SearchInput>
            </Suspense>
        </NavbarContent>

        <NavbarContent justify='end' >

        <HeaderAuth/>

        </NavbarContent>


    </Navbar>



}