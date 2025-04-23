'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedBlob from '@/app/components/motion/AnimatedBlob';
import Navlogout from '@/app/components/Navlogout';


export default function AddPatientPage() {
  const [form, setForm] = useState({
    critizen_id: '',
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    nation: '',
    religion: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    return Object.values(form).every((field) => field.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/add_patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 201) {
        router.push(`/welcome/add-patient/success?citizen_id=${form.critizen_id}`);
      } else if (res.status === 200 && data.patient) {
        alert('⚠️ ผู้ป่วยคนนี้มีอยู่แล้วในระบบ');
      } else {
        alert('❌ เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (err) {
      console.error('Error submitting:', err);
      alert('❌ เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navlogout/>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">เพิ่มข้อมูลผู้ป่วย</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {[
            ['เลขบัตรประชาชน', 'critizen_id'],
            ['ชื่อ', 'name'],
            ['อายุ', 'age'],
            ['ส่วนสูง (ซม.)', 'height'],
            ['น้ำหนัก (กก.)', 'weight'],
            ['สัญชาติ', 'nation'],
            ['ศาสนา', 'religion'],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block mb-1 text-gray-600">{label}</label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={
                  name === 'critizen_id'
                    ? (e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value) && value.length <= 13) {
                          setForm({ ...form, [name]: value });
                        }
                      }
                    : handleChange
                }
                maxLength={name === 'critizen_id' ? 13 : undefined}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-gray-600">เพศ</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
            >
              <option value="">-- เลือกเพศ --</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900 cursor-pointer'
            }`}
          >
            {loading ? '⏳ กำลังบันทึก...' : '➕ บันทึกข้อมูล'}
          </button>
        </form>
      </div>
      
      <AnimatedBlob/>
    </div>
    </div>
  );
}
