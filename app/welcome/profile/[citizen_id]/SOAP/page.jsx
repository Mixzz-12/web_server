import PatientSidebarLeft from "@/app/components/sidebar/PatientSidebarLeft";
import Navlogout from "@/app/components/Navlogout";
import PatientSidebarRight from "@/app/components/sidebar/PatientSidebarRight";
import SOAPForm from "@/app/components/SOAPForm";

export default function SOAP() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navlogout />
      <div className="flex flex-1">
        <PatientSidebarLeft />
        <main className="flex-1 p-6">
        <div className="pt-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">📝 บันทึก SOAP</h1>
        <SOAPForm/>
      </div> 
        </main>
        <PatientSidebarRight />
      </div>
    </div>
  );
}
