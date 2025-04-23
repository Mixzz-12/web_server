'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function AddMedicationsForm() {
  const { citizen_id } = useParams();
  const [medications, setMedications] = useState([
    {
      name: '',
      quantity: '',
      timing: { meal: '', times: [] },
      compartment: '',
      note: ''
    }
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addMedicationField = () => {
    if (medications.length >= 6) return;

    setMedications([
      ...medications,
      {
        name: '',
        quantity: '',
        timing: { meal: '', times: [] },
        compartment: '',
        note: ''
      }
    ]);
  };

  const updateMedication = (index, field, value) => {
    const updated = [...medications];
    if (field.includes('timing.')) {
      const [, key] = field.split('.');
      updated[index].timing[key] = value;
    } else {
      updated[index][field] = value;
    }
    setMedications(updated);
  };

  const toggleTimeCheckbox = (index, time) => {
    const updated = [...medications];
    const times = updated[index].timing.times;
    if (times.includes(time)) {
      updated[index].timing.times = times.filter((t) => t !== time);
    } else {
      updated[index].timing.times.push(time);
    }
    setMedications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!citizen_id || medications.some(m => !m.name || !m.quantity || !m.compartment)) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    try {
      const res = await fetch('/api/add_medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          critizen_id: citizen_id,
          medication: medications
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('บันทึกยาและประวัติเรียบร้อยแล้ว');
        setMedications([
          {
            name: '',
            quantity: '',
            timing: { meal: '', times: [] },
            compartment: '',
            note: ''
          }
        ]);
      } else {
        setError(data.message || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('เกิดข้อผิดพลาด');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      {medications.map((med, index) => (
        <div key={index} className="space-y-5 p-8 rounded-2xl shadow-lg bg-white w-full max-w-3xl mx-auto">
          {/* ช่องยา */}
          <select
            value={med.compartment}
            onChange={(e) => updateMedication(index, 'compartment', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="">เลือกช่องยา</option>
            <option value="servo_1">ช่องที่ 1</option>
            <option value="servo_2">ช่องที่ 2</option>
            <option value="servo_3">ช่องที่ 3</option>
            <option value="servo_4">ช่องที่ 4</option>
            <option value="servo_5">ช่องที่ 5</option>
            <option value="servo_6">ช่องที่ 6</option>
          </select>

          {/* ชื่อยา */}
          <input
            type="text"
            value={med.name}
            onChange={(e) => updateMedication(index, 'name', e.target.value)}
            placeholder="ชื่อยา"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {/* จำนวนยา */}
          <input
            type="text"
            value={med.quantity}
            onChange={(e) => updateMedication(index, 'quantity', e.target.value)}
            placeholder="จำนวน (เช่น 1 เม็ด)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {/* เวลาก่อน/หลังอาหาร */}
          <select
            value={med.timing.meal}
            onChange={(e) => updateMedication(index, 'timing.meal', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="">-- เลือกเวลา --</option>
            <option value="ก่อนอาหาร">ก่อนอาหาร</option>
            <option value="หลังอาหาร">หลังอาหาร</option>
            <option value="ก่อนนอน">ก่อนนอน</option>
          </select>

          {/* เวลา: เช้า เที่ยง เย็น */}
          <div className="text-sm text-gray-700">
            <p className="mb-1">ช่วงเวลาที่ให้ยา:</p>
            <div className="flex gap-4">
              {['เช้า', 'เที่ยง', 'เย็น', 'ก่อนนอน'].map((time) => (
                <label key={time} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={med.timing.times.includes(time)}
                    onChange={() => toggleTimeCheckbox(index, time)}
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>

          {/* หมายเหตุ */}
          <input
            type="text"
            value={med.note}
            onChange={(e) => updateMedication(index, 'note', e.target.value)}
            placeholder="หมายเหตุ (ไม่บังคับ)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addMedicationField}
        className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
      >
        ➕ เพิ่มยา
      </button>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300 transform hover:scale-[1.02] cursor-pointer"
      >
        บันทึกยา
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
    </form>
  );
}
