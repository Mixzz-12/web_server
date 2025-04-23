'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingOverlay from './LoadingOverlay';

export default function ProfileInfo() {
  const { citizen_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!citizen_id) return;

    const fetchData = async () => {
      try {
        const res = await fetch('/api/search_user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ critizen_id: citizen_id }),
        });

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [citizen_id]);

  if (loading) return <LoadingOverlay/>;
  if (!data) return <p className="text-center text-red-500 mt-10">❌ ไม่มีข้อมูล</p>;
  if (!data.found) return <p className="text-center text-red-500 mt-10">❌ ไม่พบผู้ป่วยในระบบ</p>;

  const { name, critizen_id, age, gender, weight, height, religion, nation } = data.patient;
  const genderIcon = gender === 'ชาย' ? '👨‍⚕️' : gender === 'หญิง' ? '👩‍⚕️' : '👤';

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col py-6 px-4 space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gray-100 text-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg">H</div>
          <span className="text-xl font-semibold text-gray-700">HealthPortal</span>
        </div>
  
        {/* Menu */}
        <nav className="flex flex-col gap-5 mt-6 text-sm text-gray-700 font-medium">
          <a href={`/welcome/profile/${citizen_id}`} className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-gray-100 text-indigo-600 font-semibold">
            📋 <span>ข้อมูลผู้ป่วย</span>
          </a>
          <a href={`/welcome/profile/${citizen_id}/history`} className="flex items-center gap-4 px-3 py-2 rounded-md text-gray-400 ">
            📁 <span>เพิ่มข้อมูลยา</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-3 py-2 rounded-md text-gray-400 ">
            ⚙️ <span>ตั้งค่า</span>
          </a>
        </nav>
      </aside>
  
      {/* Main Content */}
      <main className="flex-1 p-10 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">ข้อมูลผู้ป่วย</h1>
          <p className="text-sm text-gray-500">รายละเอียดผู้ป่วยในระบบ</p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ข้อมูลส่วนตัว */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">📌 ข้อมูลส่วนตัว</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-center">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <p className="text-gray-500">ชื่อ</p>
                <p className="font-medium text-gray-800">{name}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <p className="text-gray-500">อายุ</p>
                <p className="font-medium text-gray-800">{age} ปี</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <p className="text-gray-500">น้ำหนัก</p>
                <p className="font-medium text-gray-800">{weight} กก.</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <p className="text-gray-500">ส่วนสูง</p>
                <p className="font-medium text-gray-800">{height} ซม.</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 col-span-2">
                <p className="text-gray-500">ศาสนา</p>
                <p className="font-medium text-gray-800">{religion}</p>
              </div>
            </div>
          </div>
  
          {/* ข้อมูลบัตรประชาชน */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">🪪 ข้อมูลบัตรประชาชน</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-center">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 col-span-2">
                <p className="text-gray-500">เลขบัตรประชาชน</p>
                <p className="font-medium text-gray-800">{critizen_id}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <p className="text-gray-500">เพศ</p>
                <p className="font-medium text-gray-800">{gender}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <p className="text-gray-500">สัญชาติ</p>
                <p className="font-medium text-gray-800">{nation}</p>
              </div>
            </div>
          </div>
  
          {/* ประวัติการรักษา */}
          {/* ประวัติการรักษา */}
{Array.isArray(data.patient.history) && (
  <div className="col-span-1 lg:col-span-2">
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
        📁 ประวัติการจ่ายยา
      </h3>

      {data.patient.history.length === 0 ? (
        <p className="text-sm text-gray-500">ไม่มีประวัติการรักษา</p>
      ) : (
        <div className="space-y-4">
          {data.patient.history.map((entry, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 text-sm space-y-2"
            >
              <p className="text-sm font-semibold text-gray-800">📅 วันที่ {entry.date}</p>
<ul className="list-disc ml-6 text-gray-700">
  {Object.entries(entry.medical || {}).map(([medName, amount]) => (
    <li key={medName}>{medName} <span className="text-gray-500">({amount} เม็ด)</span></li>
  ))}
</ul>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}

        </div>
      </main>
  
      {/* Profile Side */}
      <aside className="w-72 bg-white px-6 py-8 border-l border-gray-100 shadow-sm hidden lg:block">
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
    </div>
  );
  
}
