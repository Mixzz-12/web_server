// app/api/send_mqtt/route.js
import mqtt from "mqtt";

export async function POST(req) {
    try {
      const { device_id, message } = await req.json();
  
      if (!device_id || !message) {
        console.error("Missing device_id or message");
        return new Response(JSON.stringify({ error: "Missing device_id or message" }), { status: 400 });
      }
  
      const client = mqtt.connect({
        host: process.env.MQTT_URI,
        port: 8884,
        protocol: 'wss',
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        path: '/mqtt',
        rejectUnauthorized: false, // ถ้า SSL ถูกต้อง เอาออกได้
      });
      
  
      await new Promise((resolve, reject) => {
        client.on("connect", () => {
          console.log("Connected to MQTT broker");
          const topic = `/dispensers/${device_id}/commands`;
  
          client.publish(topic, message, { qos: 1 }, (err) => {
            if (err) {
              console.error("Publish error:", err.message);
              reject(new Error("Publish error: " + err.message));
            } else {
              console.log("Message sent:", message);
              resolve();
            }
            client.end();
          });
        });
  
        client.on("error", (err) => {
          console.error("MQTT connect error:", err.message);
          client.end();
          reject(new Error("Connect error: " + err.message));
        });
      });
  
      return new Response(JSON.stringify({ success: true }), { status: 200 });
  
    } catch (error) {
      console.error("Server Error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  