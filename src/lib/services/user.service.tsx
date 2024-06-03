// lib/services/user.service.ts
import User from "@/lib/db/models/User";
import connectToDatabase from "@/lib/db/mongodb";

export const createUser = async (user: any) => {
  await connectToDatabase();
  const newUser = new User(user);
  await newUser.save();
  return JSON.parse(JSON.stringify(newUser));
};
