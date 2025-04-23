import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import nodemailer from "nodemailer";
import authRoutes from './routes/authRoutes.js';
import Inquiry from "./models/inquiry.js"; // ✅ Import Inquiry model
import csvRoutes from "./routes/csvRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";




dotenv.config();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS
      .split(',')
      .map(origin => origin.trim())         // remove stray whitespace
      .filter(origin => origin.length)      // drop any empty strings
  : [];

// for debugging—log out what you actually got:
console.log("🔑 ALLOWED_ORIGINS:", allowedOrigins);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.disable("etag");
app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const conn = mongoose.connection;
    console.log(
      `✅ Connected to MongoDB at ${conn.host}, database: ${conn.name} (NODE_ENV=${process.env.NODE_ENV})`
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail, Outlook, or any other SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// API Routes
app.use("/api/inquiry", inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use("/api", csvRoutes);
app.use("/api", invoiceRoutes);

// Default Route (Optional)
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the AAA Granite API");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
