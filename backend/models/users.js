import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 12;

// In-memory state for lockouts
const loginState = {};

// Utility: hash raw password env or accept pre-hashed
function hashEnvPassword(raw) {
  if (!raw) throw new Error("Missing ADMIN_PASSWORD env var");
  // If it already looks like a bcrypt hash, use it directly
  if (raw.startsWith("$2")) return raw;
  return bcrypt.hashSync(raw, SALT_ROUNDS);
}

// Record a login attempt (success or failure)
export function recordLoginAttempt(email, success) {
  const key = email.toLowerCase().trim();
  const now = Date.now();
  if (!loginState[key]) {
    loginState[key] = { attempts: 0, lastAttempt: now };
  }
  if (success) {
    loginState[key].attempts = 0;
  } else {
    loginState[key].attempts += 1;
    loginState[key].lastAttempt = now;
  }
}

// Check if an account is currently locked
export function isAccountLocked(email) {
  const key = email.toLowerCase().trim();
  const entry = loginState[key];
  if (!entry) return false;

  const MAX_FAILS = 5;
  const LOCK_DURATION = 30 * 60 * 1000; // 30 minutes
  if (entry.attempts >= MAX_FAILS) {
    // still within the lock window?
    if (Date.now() - entry.lastAttempt < LOCK_DURATION) {
      return true;
    }
    // lock window expired—reset
    entry.attempts = 0;
    return false;
  }
  return false;
}

// Your two static admin users
export const users = [
  {
    email: process.env.ADMIN_EMAIL1.toLowerCase().trim(),
    password: hashEnvPassword(process.env.ADMIN_PASSWORD1),
    role: "admin",
  },
  {
    email: process.env.ADMIN_EMAIL2.toLowerCase().trim(),
    password: hashEnvPassword(process.env.ADMIN_PASSWORD2),
    role: "admin",
  },
];

export default users;
