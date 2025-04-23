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
    }, 3000);

    return () => clearTimeout(timer);
  }, [citizen_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center animate-fade-in">
        <div className="text-5xl mb-4 text-green-500 animate-pulse">✅</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          บันทึกข้อมูลสำเร็จ!
        </h1>
        <p className="text-gray-600 text-sm">กำลังกลับไปยังข้อมูลผู้ป่วย...</p>
      </div>
    </div>
  );
}
