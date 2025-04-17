import Image from "next/image";
import Navbar from "./components/Navbar";
import { connectMongoDB } from "@/lib/mongodb";

connectMongoDB();

export default function Home() {
  return (
   <main>
    <Navbar />
    <h1>hello world</h1>
   </main>
  );
}
