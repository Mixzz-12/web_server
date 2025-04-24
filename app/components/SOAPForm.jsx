'use client'

import { useState } from 'react';
import { useParams } from 'next/navigation';
import LoadingOverlay from './LoadingOverlay';

export default function SOAPForm() {
  const { citizen_id } = useParams();

  const [formData, setFormData] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    if (
        !formData.subjective ||
        !formData.objective ||
        !formData.assessment ||
        !formData.plan
      ) {
        setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        setLoading(false);
        return;
      }

    try {
      const res = await fetch('/api/add_SOAP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          critizen_id: citizen_id,
          soap: {
            subjective: formData.subjective,
            objective: formData.objective,
            assessment: formData.assessment,
            plan: formData.plan,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('บันทึก SOAP เรียบร้อยแล้ว');
        setFormData({
          subjective: '',
          objective: '',
          assessment: '',
          plan: '',
        });
      } else {
        setError(data.message || 'เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='relative'>
    {loading && <LoadingOverlay />}
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">📝 ฟอร์มบันทึก SOAP</h2>

        {success && <p className="text-green-600 text-sm">{success}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Subjective (อาการที่ผู้ป่วยเล่าให้ฟัง)
          </label>
          <textarea
            name="subjective"
            rows={3}
            value={formData.subjective}
            onChange={handleChange}
            placeholder="เช่น ปวดหัว ไอ เจ็บคอ..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Objective (ผลจากการตรวจร่างกาย/ผลแล็บ)
          </label>
          <textarea
            name="objective"
            rows={3}
            value={formData.objective}
            onChange={handleChange}
            placeholder="เช่น วัดไข้ 38.5°C เสมหะเขียว..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Assessment (การวินิจฉัยโรค)
          </label>
          <textarea
            name="assessment"
            rows={2}
            value={formData.assessment}
            onChange={handleChange}
            placeholder="เช่น ไข้หวัดธรรมดา, หลอดลมอักเสบ..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Plan (แผนการรักษา)
          </label>
          <textarea
            name="plan"
            rows={3}
            value={formData.plan}
            onChange={handleChange}
            placeholder="เช่น ให้ยาพาราเซตามอล, นัดติดตามอาการ 3 วัน"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white transition-colors cursor-pointer ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          }`}
        >
          {loading ? 'กำลังบันทึก...' : 'บันทึก SOAP'}
        </button>
      </form>
    </div>
    </div>
  );
}
