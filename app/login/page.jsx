'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import LoadingOverlay from "../components/LoadingOverlay";
import AnimatedBlob from "../components/motion/AnimatedBlob";
import { getSession } from "next-auth/react";

export default function PageLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError("");

    const res = await signIn("credentials", {
      user,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Login failed. Please check your username and password.");
      setLoading(false)
      setPassword("");
    } else {
      const session = await getSession();
      console.log("Session after login:", session);
      if (session?.user?.role === "client") {
        router.replace("/client");
      } else if (session?.user?.role === "doctor") {
        router.replace("/welcome");
      } else {
        setError("You can not login");
        setLoading(false)
        setPassword("");
      }
      //router.replace("/welcome");
    }
  };

  return (
    <>
    {loading && <LoadingOverlay />}
    <Navbar/>
    <div className="bg-white flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded-xl p-8 space-y-4"
      >
        <h2 className="text-3xl font-light text-center text-gray-900 mb-2">Welcome to website</h2>
        <h3 className="text-base font-normal text-center text-gray-600 mb-6">Please sign in to continue</h3>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition "
          required
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md px-4 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
    <AnimatedBlob/>
    </>
  );
}