import mqtt from 'mqtt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { device_id, timeZones } = body;

    if (!device_id || !timeZones) {
      return NextResponse.json({ error: 'Missing device_id or timeZones' }, { status: 400 });
    }

    const client = mqtt.connect({
        host: process.env.MQTT_URI,
        port: 8883, // MQTT over TLS
        protocol: 'mqtts',
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        rejectUnauthorized: false, // ใช้ true หากใบรับรอง SSL ถูกต้อง
      });

    return new Promise((resolve) => {
      client.on('connect', () => {
        const topic = `/dispensers/${device_id}/time_set`;
        const payload = JSON.stringify(timeZones);

        client.publish(topic, payload, { qos: 1, retain: true }, () => {
          client.end();
          resolve(NextResponse.json({ success: true }));
        });
      });

      client.on('error', (err) => {
        console.error('MQTT error:', err);
        client.end();
        resolve(NextResponse.json({ error: 'MQTT connection failed' }, { status: 500 }));
      });
    });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
