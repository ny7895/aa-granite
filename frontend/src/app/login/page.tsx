"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../login/LoginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  // ➊ If already authenticated, redirect to /admin
  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) router.replace("/admin");
    });
  }, [apiUrl, router]);

  // ➋ Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.replace("/admin");
    } else {
      const body = await res.json();
      setError(body.error || "Login failed");
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
