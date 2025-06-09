"use client";

import { getSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (!session) {
        setError("Please login first.");
        return;
      }

      const critizen_id = session.user.name;

      try {
        // เรียก 3 API พร้อมกัน
        const [res1, res2, res3] = await Promise.all([
          fetch("/api/search_user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ critizen_id }),
          }),
          fetch("/api/machine_api/fetch_user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ critizen_id }),
          }),
          fetch("/api/find_medication", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ critizen_id }),
          }),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();

        if (res1.ok && data1.found && res2.ok && data2.found && res3.ok) {
          const medications = data3.medications || [];

          // map history เพื่อเพิ่มช่องของยาไปในชื่อยา
          const history_Compartment = (data1.patient.history || []).map((entry) => {
            const medicalWithCompartment = {};
            for (const [medName, amount] of Object.entries(entry.medical)) {
              // หา compartment ของยาใน medications
              const medObj = medications.find((med) => med.name === medName);
              // ถ้าเจอช่อง ให้แปลง servo_1 เป็น ช่อง 1 (ถ้าไม่เจอ ใช้ ช่อง ?)
              const compartment = medObj?.compartment
                ? `ช่อง ${medObj.compartment.replace("servo_", "")}`
                : "ช่อง ?";
              // ทำข้อความเป็น "Paracetamol 2 เม็ด (ช่อง 1)"
              medicalWithCompartment[`${medName} ${amount} เม็ด (${compartment})`] = amount;
            }
            return { ...entry, medical: medicalWithCompartment };
          });

          setPatientData({
            ...data1.patient,
            history: history_Compartment,
            extra: data2.User_find,
          });
        } else {
          setError("Some data not found");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!patientData) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Menu</h2>
        <nav className="flex flex-col space-y-4 text-gray-700">
          <a href="#" className="font-semibold text-indigo-600">
            📋ข้อมูลผู้ป่วย
          </a>
          <a href="/client/machine">⚙️ ควบคุมตู่จ่ายยา</a>
          <a href="/client/time_setting">⏰ ตั้งเวลา</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <h1 className="text-2xl font-semibold">PharmaNetix</h1>
          <button
            onClick={() => signOut()}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Sign Out
          </button>
        </header>

        {/* Body */}
        <main className="flex flex-1 p-8 gap-8">
          {/* Patient Info */}
          <div className="flex-1 space-y-8">
            {/* ข้อมูลส่วนตัว */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">ข้อมูลส่วนตัว</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <strong>ชื่อ:</strong> {patientData.name}
                </div>
                <div>
                  <strong>อายุ:</strong> {patientData.age} ปี
                </div>
                <div>
                  <strong>น้ำหนัก:</strong> {patientData.weight} กก.
                </div>
                <div>
                  <strong>ส่วนสูง:</strong> {patientData.height} ซม.
                </div>
                <div>
                  <strong>ศาสนา:</strong> {patientData.religion}
                </div>
                <div>
                  <strong>Device ID:</strong> {patientData.extra?.device_id || "N/A"}
                </div>
              </div>
            </section>

            {/* ประวัติการรักษา */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">ประวัติการจ่ายยา</h2>

              {patientData.history?.length ? (
                <div className="space-y-4">
                  {patientData.history
                    .slice() // clone array
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((entry, idx) => (
                      <div key={idx} className="border rounded p-4">
                        <div className="font-semibold mb-2">{entry.date}</div>
                        <ul className="list-disc pl-5 text-gray-700">
                          {Object.entries(entry.medical).map(([medName, amount], index) => (
                            <li key={index}>
                              {medName} {/* เช่น Paracetamol 2 เม็ด (ช่อง 1) */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">ไม่มีประวัติการจ่ายยา</p>
              )}
            </section>
          </div>

          {/* Profile Card */}
          <div className="w-80">
            <div className="bg-white p-6 rounded-lg shadow text-center space-y-4">
              <div className="text-6xl">
                {patientData.gender === "ชาย"
                  ? "👨‍⚕️"
                  : patientData.gender === "หญิง"
                  ? "👩‍⚕️"
                  : "👤"}
              </div>

              <div className="text-xl font-semibold">{patientData.name}</div>
              <div className="text-gray-500">{patientData.nation}</div>
              <div className="grid grid-cols-2 gap-4 text-sm mt-4 text-gray-700">
                <div>
                  <strong>อายุ</strong>
                  <br />
                  {patientData.age}
                </div>
                <div>
                  <strong>น้ำหนัก</strong>
                  <br />
                  {patientData.weight} กก.
                </div>
                <div>
                  <strong>ส่วนสูง</strong>
                  <br />
                  {patientData.height} ซม.
                </div>
                <div>
                  <strong>ศาสนา</strong>
                  <br />
                  {patientData.religion}
                </div>
                <div className="col-span-2 mt-2">
                  <strong>Device ID</strong>
                  <br />
                  {patientData.extra?.device_id || "ไม่พบข้อมูล"}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
