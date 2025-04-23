'use client';

import { useEffect } from 'react';
import { useRouter , useSearchParams} from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const serachParams = useSearchParams();
  const citizen_id = serachParams.get('citizen_id')

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/welcome/profile/${citizen_id}`); // กลับไปหน้าฟอร์มหลัง 3 วินาที
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center animate-fade-in">
        <div className="text-5xl mb-4 text-green-500 animate-pulse">✅</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          บันทึกข้อมูลสำเร็จ!
        </h1>
        <p className="text-gray-600 text-sm">กำลังกลับไปหน้าฟอร์ม...</p>
      </div>
    </div>
  );
}
