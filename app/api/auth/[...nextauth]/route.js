// app/api/auth/[...nextauth]/route.js
import { handlers } from '@/auth'; // << ต้องชี้ไปที่ไฟล์ auth.ts หรือ auth.js

export const { GET, POST } = handlers;
