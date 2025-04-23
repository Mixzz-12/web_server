import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navlogout from "../components/Navlogout";
import SearchForm from "../components/search_form";
import AddPatientButton from "../components/button/adddatabutton";

export default async function WelcomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-100 overflow-hidden">
      {/* 🔵 พื้นหลังเบลอเคลื่อนไหว */}
      <div className="absolute w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob top-0 left-20 z-0" />
      <div className="absolute w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 top-20 left-1/2 transform -translate-x-1/2 z-0" />
      <div className="absolute w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 bottom-0 right-20 z-0" />

      <Navlogout />

      {/* 🟦 กล่องต้อนรับ */}
      <div className="relative flex items-center justify-center min-h-screen px-4 z-10">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <h3 className="text-3xl font-light tracking-wide text-gray-900">
            Welcome Home, {session.user.name}
          </h3>
          <p className="mt-4 text-gray-500 text-sm">
            We’re glad to have you back.
          </p>

          <div className="mt-6">
            <SearchForm />
          </div>
          <div className="mt-3">
            <AddPatientButton />
          </div>
        </div>
      </div>
    </div>
  );
}
