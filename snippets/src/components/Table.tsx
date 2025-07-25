'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Link from "next/link"
export default function TableData({ data }: { data: { id: number, title: string }[] }) {



    return <div className="mt-15" >
        <h2 className="text-center" >A list of all the Snippets Created.</h2>
        <Table   >
            <TableHeader>
                <TableRow  >
                    <TableHead >SnippetName</TableHead>
                    <TableHead>Links</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, i) => {
                    return <TableRow key={i} >
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell><Link href={`/snippets/${item.id}`} >link</Link></TableCell>
                    </TableRow>
                })}


            </TableBody>
        </Table>
    </div>



}