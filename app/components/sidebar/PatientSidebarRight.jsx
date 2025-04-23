'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LoadingOverlay from '../LoadingOverlay';

export default function PatientSidebarRight() {
  const { citizen_id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ state loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/search_user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ critizen_id: citizen_id }),
        });
        const data = await res.json();
        if (data.found) {
          setPatient(data.patient);
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false); // ✅ หยุด loading ไม่ว่าจะสำเร็จหรือพลาด
      }
    };

    if (citizen_id) {
      fetchData();
    }
  }, [citizen_id]);

  // ✅ แสดงข้อความขณะโหลด
  if (loading) {
    return (
      <LoadingOverlay/>
    );
  }

  if (!patient) return null;

  const { name, age, weight, height, gender, religion, nation } = patient;
  const genderIcon = gender === 'ชาย' ? '👨‍⚕️' : gender === 'หญิง' ? '👩‍⚕️' : '👤';
  return (
    <aside className="w-72 min-h-screen bg-white px-6 py-8 border-l border-gray-100 shadow-sm hidden lg:block">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl text-indigo-500">
          {genderIcon}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{nation}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-center">
        <div className="bg-gray-50 border border-gray-100 rounded-lg py-2">
          อายุ<br /><span className="font-medium text-gray-700">{age}</span>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg py-2">
          น้ำหนัก<br /><span className="font-medium text-gray-700">{weight} กก.</span>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg py-2">
          ส่วนสูง<br /><span className="font-medium text-gray-700">{height} ซม.</span>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg py-2">
          ศาสนา<br /><span className="font-medium text-gray-700">{religion}</span>
        </div>
      </div>
    </aside>
  );
}
