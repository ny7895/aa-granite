"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import styles from "../login/LoginPage.module.css";

interface DecodedToken {
  exp: number;
  role?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    console.log("API URL is:", process.env.NEXT_PUBLIC_API_URL);
    async function checkAuth() {
      try {
        const res = await fetch(`${apiUrl}/auth/me`, {
          method: "GET",
          credentials: "include", // send cookies
        });
        if (res.ok) {
          router.replace("/admin");
        }
      } catch {
        // not logged in, ignore
      }
    }
    checkAuth();
  }, [apiUrl, router]);

  // 2️⃣ Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        credentials: "include", // important!
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Server set the cookie — just redirect to admin
        router.replace("/admin");
      } else {
        const body = await res.json();
        setError(body.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
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
