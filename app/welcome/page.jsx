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
    <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen">
      <Navlogout />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <h3 className="text-3xl font-light tracking-wide text-gray-900">
            Welcome Home, {session.user.name}
          </h3>
          <p className="mt-4 text-gray-500 text-sm">
            We’re glad to have you back.
          </p>
          <div className="mt-6">
            {/* <input
            type="text"
            placeholder="search. . ."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            /> */}
            <SearchForm/>
          </div>
          <div className="mt-3">
            <AddPatientButton/>
          </div>
        </div>
      </div>
    </div>
  );
}  
