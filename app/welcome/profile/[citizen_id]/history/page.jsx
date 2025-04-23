import Navlogout from "@/app/components/Navlogout";
import AddMedicationsForm from "@/app/components/AddMedicationsForm";
import PatientSidebarRight from "@/app/components/sidebar/PatientSidebarRight";
import PatientSidebarLeft from "@/app/components/sidebar/PatientSidebarLeft";

export default function HiPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar ด้านบน */}
      <Navlogout />

      {/* Layout ซ้าย-กลาง-ขวา */}
      <div className="flex">
        {/* Sidebar ซ้าย */}
        <PatientSidebarLeft />

        {/* Content กลาง */}
        <main className="flex-1 p-10">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">💊 เพิ่มข้อมูลยา</h1>
          <AddMedicationsForm />
        </main>

        {/* Sidebar ขวา */}
        <div className="hidden lg:block">
          <PatientSidebarRight />
        </div>
      </div>
    </div>
  );
}
