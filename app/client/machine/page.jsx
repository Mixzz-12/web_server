"use client";

import { getSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function MqttControlPage() {
  const [deviceId, setDeviceId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (!session) {
        setError("Please login first.");
        return;
      }

      const critizen_id = session.user.name;

      try {
        const res = await fetch("/api/machine_api/fetch_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ critizen_id }),
        });

        const data = await res.json();
        if (res.ok && data.found) {
          setDeviceId(data.User_find.device_id);
        } else {
          setError("Device not found");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
    }

    fetchData();
  }, []);

  async function sendMqttCommand(message) {
    if (!deviceId) {
      alert("Device ID not found");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/machine_api/send_mqtt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: deviceId, message }),
      });

      if (!res.ok) {
        console.error(result);
        throw new Error("Failed to send MQTT message");
      }

      alert("MQTT message sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Error sending MQTT message");
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!deviceId) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">MQTT Control</h2>
        <nav className="flex flex-col space-y-4 text-gray-700">
          <a href="/client">ข้อมูลผู้ป่วย</a>
          <a href="#" className="font-semibold text-indigo-600">ควบคุมตู้จ่ายยา</a>
          <a href="/client/time_setting">ตั้งเวลา</a>
        </nav>
      </aside>
  
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* TopBar */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <h1 className="text-2xl font-semibold">MQTT Control</h1>
          <button 
            onClick={() => signOut()} 
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Sign Out
          </button>
        </header>
  
        {/* Body */}
        <main className="flex flex-1 p-8 bg-gray-100">
          <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow space-y-8">
  
            {/* Device ID */}
            <h2 className="text-2xl font-bold text-gray-800">Device ID: {deviceId}</h2>
  
            {/* Servo Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((servo) => (
                <button 
                  key={servo}
                  onClick={() => {
                    
                      sendMqttCommand(`servo_${servo}`);
                    
                  }}
                  disabled={loading}
                  className="w-full aspect-square bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow transition flex flex-col items-center justify-center gap-4 disabled:opacity-50"
                >
                  {/* SVG รูปหม้อ/จานหมุน */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
                    <path d="M12 2C6.48 2 2 6.48 2 12h2a8 8 0 1116 0h2c0-5.52-4.48-10-10-10zm0 16a8 8 0 01-8-8H2c0 5.52 4.48 10 10 10s10-4.48 10-10h-2a8 8 0 01-8 8z" />
                  </svg>
  
                  {/* Label ปุ่ม */}
                  <span className="text-lg font-semibold">Servo {servo}</span>
                </button>
              ))}
            </div>
  
          </div>
        </main>
  
      </div>
    </div>
  );
  
}
