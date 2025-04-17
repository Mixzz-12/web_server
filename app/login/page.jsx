'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PageLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const res = await signIn("credentials", {
      user,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Login failed. Please check your username and password.");
      setPassword("");
      
    } else {
      router.replace("/welcome");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto py-10">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      {error && <p className="bg-red-100 text-red-600 border border-red-300 rounded px-4 py-2 mb-4 text-sm">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
