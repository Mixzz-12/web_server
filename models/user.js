import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  role: String,
  device_id: String
});


export default mongoose.models.User || mongoose.model("User", userSchema, "User_role");
