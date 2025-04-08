import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load .env values

// 🔹 Store Admin Users Here
const users = [
  {
    email: process.env.ADMIN_EMAIL1,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD1, 10),
    role: "admin",
  },
  {
    email: process.env.ADMIN_EMAIL2,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD2, 10),
    role: "admin",
  },
];

export default users;
