
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

export default async function WelcomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login"); 
  }

  return (
    <div>
      <Navbar />
      <div className="container auto">
        <h3 className="text-3xl">Welcome Home, {session.user.name} </h3>
      </div>
    </div>
  );
}
