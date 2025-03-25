"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/LoginPage.module.css"; // Import the CSS module

// Define expected structure of the decoded token
interface DecodedToken {
  exp: number;
  role?: string; // Optional if it might not exist in all tokens
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents SSR issues

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token); // Use the interface
        console.log("✅ Token found:", decoded);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime && decoded.role === "admin") {
          console.log("✅ Redirecting to /admin...");
          router.replace("/admin");
        } else {
          console.log("❌ Expired or invalid token. Logging out.");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("❌ Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Login successful. Token received:", data.token);
      localStorage.setItem("token", data.token);
      console.log(
        "🔍 Stored Token in localStorage:",
        localStorage.getItem("token")
      );
      router.replace("/admin");
    } else {
      setError(data.error);
      console.log("❌ Login failed:", data.error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🔑 Admin Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
