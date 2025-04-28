'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function TimePage() {
  const hours = Array.from({ length: 24 }, (_, i) => i); 
  const minutes = [0, 15, 30, 45]; 

  const [times, setTimes] = useState({
    breakfast: { hour: 7, minute: 0 },
    lunch: { hour: 12, minute: 0 },
    dinner: { hour: 18, minute: 0 },
    sleep: { hour: 22, minute: 0 },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (type, part, value) => {
    setTimes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [part]: Number(value),
      },
    }));
  };

  const handleSubmit = () => {
    console.log('เวลาที่ตั้งไว้:', times);
    setIsModalOpen(true); // เปิด Modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Time Setting</h2>
        <nav className="flex flex-col space-y-4 text-gray-700">
          <a href="/client">ข้อมูลผู้ป่วย</a>
          <a href="/client/machine">ควบคุมตู้จ่ายยา</a>
          <a href="#" className="font-semibold text-indigo-600">ตั้งเวลา</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* TopBar */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <h1 className="text-2xl font-semibold">ตั้งเวลารายวัน</h1>
          <button 
            onClick={() => signOut()} 
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Sign Out
          </button>
        </header>

        {/* Body */}
        <main className="flex flex-1 p-8 bg-gray-100">
          <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-8">

            {/* Time Pickers */}
            {[
              { label: 'ทานข้าวเช้า', name: 'breakfast' },
              { label: 'ทานข้าวเที่ยง', name: 'lunch' },
              { label: 'ทานข้าวเย็น', name: 'dinner' },
              { label: 'นอน', name: 'sleep' },
            ].map((item) => (
              <div key={item.name} className="flex flex-col gap-2">
                <label className="text-gray-700 font-semibold">{item.label}</label>
                <div className="flex gap-4">
                  <select
                    value={times[item.name].hour}
                    onChange={(e) => handleChange(item.name, 'hour', e.target.value)}
                    className="p-2 border border-gray-300 rounded flex-1"
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>

                  <select
                    value={times[item.name].minute}
                    onChange={(e) => handleChange(item.name, 'minute', e.target.value)}
                    className="p-2 border border-gray-300 rounded flex-1"
                  >
                    {minutes.map((m) => (
                      <option key={m} value={m}>
                        {m.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition mt-8"
            >
              บันทึกเวลา
            </button>

          </div>
        </main>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm mx-auto text-center space-y-4 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">สำเร็จ</h2>
              <p className="text-gray-600">บันทึกเวลาเรียบร้อย!</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition"
              >
                ตกลง
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
