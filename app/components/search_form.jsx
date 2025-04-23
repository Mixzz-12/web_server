'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/app/components/LoadingOverlay'; // import overlay ที่สร้างไว้

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // state สำหรับ loading
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // เริ่มโหลด

    if (!query.trim()) {
      setError('กรุณากรอกข้อมูล');
      setLoading(false); //หยุดโหลดถ้ามี error
      return;
    }

    try {
      const res = await fetch('/api/search_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ critizen_id: query }),
      });

      const data = await res.json();

      if (data.found) {
        router.push(`/welcome/profile/${data.patient.critizen_id}`);
      } else {
        setError('ไม่พบผู้ใช้นี้ในระบบ');
      }
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด');
    } finally {
      setLoading(false); // หยุดโหลดหลังจากทำเสร็จ
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />} {/*แสดง overlay เมื่อ loading */}
      
      <form onSubmit={handleSubmit} className="space-y-2 relative z-10">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) && value.length <= 13) {
              setQuery(value);
            }
          }}
          placeholder="ค้นหาชื่อหรือเลขบัตร . . ."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer"
        >
          search
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </>
  );
}
