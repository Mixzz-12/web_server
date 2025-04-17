import { connectMongoDB } from "@/lib/mongodb";
import user from "@/models/user";
import bcrypt from "bcryptjs";

export async function registerUser({ id, name, password }) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Check if user already exists
    const existingUser = await user.findOne({ id });
    if (existingUser) {
      console.log(`User with id '${id}' already exists.`);
      return null;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await user.create({
      id,
      name,
      password: hashedPassword,
    });

    console.log(`✅ User '${id}' created successfully.`);
    return newUser;
    
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
