'use client';

import { useParams } from 'next/navigation';

export default function PatientSidebarLeft() {
  const { citizen_id } = useParams();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col py-6 px-4 space-y-6">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-gray-100 text-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg">H</div>
        <span className="text-xl font-semibold text-gray-700">HealthPortal</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-5 mt-6 text-sm text-gray-700 font-medium">
        <a href={`/welcome/profile/${citizen_id}`} className="flex items-center gap-4 px-3 py-2 rounded-md text-gray-400">
          📋 <span>ข้อมูลผู้ป่วย</span>
        </a>
        <a href={`/welcome/profile/${citizen_id}/history`} className="flex items-center gap-4 px-3 py-2 rounded-md  hover:bg-gray-100 text-indigo-600 font-semibold ">
          📁 <span>เพิ่มข้อมูลยา</span>
        </a>
        <a href="#" className="flex items-center gap-4 px-3 py-2 rounded-md text-gray-400">
          ⚙️ <span>ตั้งค่า</span>
        </a>
      </nav>
    </aside>
  );
}
