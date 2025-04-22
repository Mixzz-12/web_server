// ✅ ต้องมี default export และต้องเป็น React Component
export default function HiPage() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Hi Page!</h1>
        <p>แสดงบางอย่างสำหรับ citizen_id ที่ route เข้ามา</p>
      </div>
    );
  }
  