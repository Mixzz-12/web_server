'use client';

import { useRouter } from 'next/navigation';

export default function AddPatientButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/welcome/add-patient');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer"
    >
      ➕ เพิ่มข้อมูลผู้ป่วย
    </button>
  );
}
