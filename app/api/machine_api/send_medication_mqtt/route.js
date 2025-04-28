import mqtt from "mqtt";
import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";
import User from "@/models/user"; 

export async function POST(req) {
  try {
    const { critizen_id } = await req.json();

    if (!critizen_id) {
      console.error("Missing critizen_id");
      return new Response(JSON.stringify({ error: "Missing critizen_id" }), { status: 400 });
    }

    await connectMongoDB();

    // หา patient จาก critizen_id
    const patient = await Patient.findOne({ critizen_id: critizen_id });

    if (!patient) {
      console.error("Patient not found");
      return new Response(JSON.stringify({ error: "Patient not found" }), { status: 404 });
    }

    // 2. หา user โดยใช้ name == critizen_id
    const foundUser = await User.findOne({ name: critizen_id });

    if (!foundUser) {
      console.error("User not found for this critizen_id");
      return new Response(JSON.stringify({ error: "User not found for this critizen_id" }), { status: 404 });
    }

    const successResponse = new Response(JSON.stringify({ success: true }), { status: 200 });

    const payload = {
      critizen_id: patient.critizen_id,
      medications: patient.medications
    };

    // 3. เชื่อมต่อ MQTT
    const client = mqtt.connect({
        host: process.env.MQTT_URI,
        port: 8883,  // เปลี่ยนเป็นพอร์ต mqtts (เช่น 8883 ไม่ใช่ 8884)
        protocol: 'mqtts',  // <<< เปลี่ยนจาก wss เป็น mqtts
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        rejectUnauthorized: false,
      });
      

    await new Promise((resolve, reject) => {
      client.on("connect", () => {
        console.log(" Connected to MQTT broker");

        // 4. ใช้ device_id ที่ได้จาก user
        const topic = `/dispensers/${foundUser.device_id || "default_device"}/details`;

        client.publish(topic, JSON.stringify(payload), { qos: 1, retain: true  }, (err) => {
          if (err) {
            console.error("Publish error:", err.message);
            reject(new Error("Publish error: " + err.message));
          } else {
            console.log(" Sent medications to MQTT:", payload);
            resolve();
          }
          client.end();
        });
      });

      client.on("error", (err) => {
        console.error(" MQTT connect error:", err.message);
        client.end();
        reject(new Error("Connect error: " + err.message));
      });
    });

    return successResponse;

  } catch (error) {
    console.error(" Server Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
