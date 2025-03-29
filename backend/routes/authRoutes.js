import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import users from "../models/users.js"; // ✅ Import Admin Users

dotenv.config();
const router = express.Router();

// 🔹 Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // ✅ Generate a JWT Token with `role: "admin"`
  const token = jwt.sign({ email: user.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });

  console.log("✅ Admin Logged In:", user.email);
  res.json({ token });
});

export default router;
