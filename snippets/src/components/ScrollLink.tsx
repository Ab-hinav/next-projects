'use client'

import Link from 'next/link';

function ScrollLink({ id, children }:{
    id: string,
    children: React.ReactNode
}) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault(); // Prevent default anchor tag behavior
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Link href={`#${id}`} passHref>
            <div onClick={handleClick}>{children}</div>
        </Link>
    );
}

export default ScrollLink;