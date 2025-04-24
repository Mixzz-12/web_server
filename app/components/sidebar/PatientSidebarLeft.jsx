'use client';

import { useParams, usePathname } from 'next/navigation';

export default function PatientSidebarLeft() {
  const { citizen_id } = useParams();
  const pathname = usePathname();

  const menuItems = [
    {
      href: `/welcome/profile/${citizen_id}`,
      label: 'ข้อมูลผู้ป่วย',
      icon: '📋',
    },
    {
      href: `/welcome/profile/${citizen_id}/SOAP`,
      label: 'SOAP',
      icon: '📋',
    },
    {
      href: `/welcome/profile/${citizen_id}/history`,
      label: 'เพิ่มข้อมูลยา',
      icon: '📁',
    },
    {
      href: '#',
      label: 'ตั้งค่า',
      icon: '⚙️',
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col py-6 px-4 space-y-6">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-gray-100 text-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg">H</div>
        <span className="text-xl font-semibold text-gray-700">HealthPortal</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-5 mt-6 text-sm text-gray-700 font-medium">
        {menuItems.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <a
              key={href}
              href={href}
              className={`flex items-center gap-4 px-3 py-2 rounded-md ${
                isActive ? 'text-indigo-600 font-semibold bg-gray-100' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {icon} <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
