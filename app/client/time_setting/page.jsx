'use client';

import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';

export default function TimePage() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const [times, setTimes] = useState({
    breakfast: { hour: 7, minute: 0 },
    lunch: { hour: 12, minute: 0 },
    dinner: { hour: 18, minute: 0 },
    sleep: { hour: 22, minute: 0 },
  });

  const [deviceId, setDeviceId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // ✅ ดึง device_id จาก API หลังจาก login
  useEffect(() => {
    async function fetchDeviceId() {
      const session = await getSession();
      if (!session) {
        setError('กรุณาเข้าสู่ระบบก่อน');
        return;
      }

      const critizen_id = session.user.name;
      try {
        const res = await fetch('/api/machine_api/fetch_user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ critizen_id }),
        });

        const data = await res.json();
        if (res.ok && data.found) {
          setDeviceId(data.User_find.device_id);
        } else {
          setError('ไม่พบข้อมูลอุปกรณ์');
        }
      } catch (err) {
        console.error(err);
        setError('เกิดข้อผิดพลาดขณะดึงข้อมูลอุปกรณ์');
      }
    }

    fetchDeviceId();
  }, []);

  const handleChange = (type, part, value) => {
    setTimes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [part]: Number(value),
      },
    }));
  };

  const adjustTime = (hour, minute, diff) => {
    let total = hour * 60 + minute + diff;
    if (total < 0) total += 1440;
    if (total >= 1440) total -= 1440;
    return {
      hour: Math.floor(total / 60),
      minute: total % 60,
    };
  };

  const formatTime = ({ hour, minute }) => {
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(hour)}:${pad(minute)}`;
  };

  const handleSubmit = async () => {
    if (!deviceId) {
      alert('ไม่พบ Device ID');
      return;
    }

    const timeZones = {
      breakfast: {
        before: formatTime(adjustTime(times.breakfast.hour, times.breakfast.minute, -30)),
        after: formatTime(adjustTime(times.breakfast.hour, times.breakfast.minute, 30)),
      },
      lunch: {
        before: formatTime(adjustTime(times.lunch.hour, times.lunch.minute, -30)),
        after: formatTime(adjustTime(times.lunch.hour, times.lunch.minute, 30)),
      },
      dinner: {
        before: formatTime(adjustTime(times.dinner.hour, times.dinner.minute, -30)),
        after: formatTime(adjustTime(times.dinner.hour, times.dinner.minute, 30)),
      },
      sleep: {
        before: formatTime(adjustTime(times.sleep.hour, times.sleep.minute, -30)),
      },
    };

    try {
      const res = await fetch('/api/machine_api/set-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId, timeZones }),
      });

      if (!res.ok) throw new Error('ส่งข้อมูลล้มเหลว');

      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!deviceId) return <p className="text-center mt-10">กำลังโหลด...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Menu</h2>
        <nav className="flex flex-col space-y-4 text-gray-700">
          <a href="/client" className="font-sans">📋ข้อมูลผู้ป่วย</a>
          <a href="/client/machine">⚙️ ควบคุมตู้จ่ายยา</a>
          <a href="#" className="font-semibold text-indigo-600">⏰ ตั้งเวลา</a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <h1 className="text-2xl font-semibold">ตั้งเวลารายวัน</h1>
          <button
            onClick={() => signOut()}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Sign Out
          </button>
        </header>

        <main className="flex flex-1 p-8 bg-gray-100">
          <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-8">
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
                      <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>
                    ))}
                  </select>

                  <select
                    value={times[item.name].minute}
                    onChange={(e) => handleChange(item.name, 'minute', e.target.value)}
                    className="p-2 border border-gray-300 rounded flex-1"
                  >
                    {minutes.map((m) => (
                      <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded mt-8 cursor-pointer"
            >
              บันทึกเวลา
            </button>
          </div>
        </main>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm mx-auto text-center space-y-4 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">สำเร็จ</h2>
              <p className="text-gray-600">บันทึกเวลาและส่งข้อมูลแล้ว!</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded"
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
