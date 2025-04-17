import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';


export async function POST(req: Request) {
    const { name, password } = await req.json();
  
    if (!name || !password) {
      return NextResponse.json({ message: 'Missing name or password' }, { status: 400 });
    }
  
    try {
      const client = await clientPromise;
      const db = client.db(); // หรือใส่ชื่อ DB เช่น db('mydb')
      const users = db.collection('users');
  
      const user = await users.findOne({ name, password });
  
      if (user) {
        return NextResponse.json({ message: 'Login success', user });
      } else {
        return NextResponse.json({ message: 'Invalid name or password' }, { status: 401 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }