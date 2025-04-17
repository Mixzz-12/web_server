import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

// 👇 เพิ่ม "testdata" เป็นชื่อ collection ที่ใช้จริงใน MongoDB
export default mongoose.models.User || mongoose.model("User", userSchema, "testdata");
