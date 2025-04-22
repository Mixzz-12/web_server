'use client';

import { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add_patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('บันทึกข้อมูลสำเร็จ');
        // redirect หรือเคลียร์ form ได้ตามต้องการ
      } else {
        alert('เกิดข้อผิดพลาด');
      }
    } catch (err) {
      console.error('Error submitting:', err);
    }
  };

  return (
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
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 13) {
                      setForm({ ...form, critizen_id: value });
                    }
                  }}
                maxLength={13}
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
    <option value="ชาย">ชาย</option>
    <option value="หญิง">หญิง</option>
    <option value="อื่นๆ">อื่นๆ</option>
  </select>
</div>


          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            ➕ บันทึกข้อมูล
          </button>
        </form>
      </div>
    </div>
  );
}
