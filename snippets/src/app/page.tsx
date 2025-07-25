

import { db } from "@/db";
import Link from "next/link";
import TableData from "@/components/Table"



export default async function Home() {

  const snippets = await db.snippet.findMany();


  return <div className="h-screen" >
    <nav className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl px-8 py-4 m-4 flex justify-between items-center shadow-lg">
      <Link href="/" className="text-black font-semibold">Home</Link>
      <Link href="/snippets/new" className="text-black font-semibold">Create Snippets</Link>
      <Link href="/about" className="text-black font-semibold">About</Link>
    </nav>
    <div>
      <TableData data={snippets}></TableData>
    </div>
  </div>

}
