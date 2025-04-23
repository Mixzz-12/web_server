'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const citizen_id = searchParams.get('citizen_id');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (citizen_id) {
        router.push(`/welcome/profile/${citizen_id}`);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [citizen_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fade-in space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-3xl text-green-500 animate-ping-slow">✓</span>
        </div>
        <h1 className="text-2xl font-medium text-gray-800">บันทึกสำเร็จ</h1>
        <p className="text-sm text-gray-500">
          ระบบกำลังนำคุณไปยังหน้าข้อมูลผู้ป่วย...
        </p>
      </div>
    </div>
  );
}
