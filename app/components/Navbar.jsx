'use client'

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-black transition">
            nextauth
          </Link>

          {/* Navigation / Actions */}
          <ul className="flex items-center space-x-4 text-sm font-medium">
            <li>
              <Link
                href="/login"
                className="text-gray-600 hover:text-black transition"
              >
                Sign In
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-gray-900 text-white px-4 py-1.5 rounded-md hover:bg-black transition cursor-pointer"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
