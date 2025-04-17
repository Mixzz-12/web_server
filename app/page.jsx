import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4 text-center">
        <h1 className="text-4xl font-light text-gray-800 mb-8">Welcome</h1>
        <p className="text-gray-500 mb-6">Please choose your role to continue</p>

        <div className="flex space-x-4">
          <Link href='/login'>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition cursor-pointer">
            I'm a Doctor
          </button>
          </Link>
          <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer">
            I'm a Client
          </button>
        </div>
      </div>
    </main>
  );
}

