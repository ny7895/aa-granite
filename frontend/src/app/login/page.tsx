"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ Prevents SSR issues

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
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
    <div style={styles.container}>
      <h1 style={styles.heading}>🔑 Admin Login</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px", // ✅ Adds space between inputs
  },
  input: {
    width: "300px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "16px",
    marginTop: "10px",
  },
};
