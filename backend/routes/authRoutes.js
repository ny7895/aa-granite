// routes/authRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { users, recordLoginAttempt, isAccountLocked } from "../models/users.js";
import logger from "../utils/logger.js";

dotenv.config();
const router = express.Router();

// ── Middleware ────────────────────────────────────────────────────────────────

// 1️⃣ Rate limiter: max 5 attempts per IP per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res) =>
    res
      .status(429)
      .json({ error: "Too many login attempts, please try again later." }),
});

// 2️⃣ Input validation
const validateLogin = [
  body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// 3️⃣ JWT authentication middleware
function authenticateJWT(req, res, next) {
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────

// 🔹 Admin Login
router.post(
  "/login",
  loginLimiter,
  validateLogin,
  async (req, res) => {
    // 1. Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Login validation failed", { errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const ip = req.ip;
    const userAgent = req.get("User-Agent");

    // 2. Lockout check
    if (isAccountLocked(email)) {
      logger.warn("Locked out login attempt", { email, ip, userAgent });
      return res
        .status(423)
        .json({
          error:
            "Account temporarily locked due to multiple failed login attempts.",
        });
    }

    try {
      // 3. Lookup admin user
      const user = users.find(
        (u) => u.email === email.toLowerCase().trim()
      );
      const passwordMatches =
        user && (await bcrypt.compare(password, user.password));

      if (!user || !passwordMatches) {
        recordLoginAttempt(email, false);
        logger.warn("Failed admin login attempt", { email, ip, userAgent });
        return res
          .status(401)
          .json({ error: "Invalid email or password" });
      }

      // 4. Successful login: reset lockout
      recordLoginAttempt(email, true);

      // 5. Issue JWT (HS512) & set HttpOnly cookie
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { algorithm: "HS512", expiresIn: "2h" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      });

      logger.info("Admin logged in successfully", { email, ip, userAgent });
      return res.json({ message: "Logged in successfully" });
    } catch (err) {
      logger.error("Error in /auth/login", {
        error: err.message,
        stack: err.stack,
        email,
        ip,
        userAgent,
      });
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.post("/logout", authenticateJWT, (req, res) => {
  // Clear the cookie by setting it to an empty value and immediate expiry
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",  // ensure you clear it at the same path you set it
  });
  return res.json({ message: "Logged out successfully" });
});

// 🔹 “Who Am I?” — check session via HttpOnly cookie
router.get("/me", authenticateJWT, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

export default router;
