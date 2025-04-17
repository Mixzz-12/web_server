'use client'

import react from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Navbar () {
    return (
        <nav className="bg-[#333] text-white p-5">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href="/">Nextauth</Link>
                    </div>
                    <ul>
                        <li className="mx-3"><Link href="/login">Sign In</Link></li>
                        <li className="bg-red-500 text-white px-4 py-2 rounded"><button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar