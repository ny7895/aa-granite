import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import nodemailer from "nodemailer";
import authRoutes from './routes/authRoutes.js';
import User from "./models/users.js"; // ✅ Import User model
import Inquiry from "./models/inquiry.js"; // ✅ Import Inquiry model
import csvRoutes from "./routes/csvRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";



dotenv.config();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];
// Middleware
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

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

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // ✅ Include `role` in token payload
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    console.log("✅ Token Sent to Client:", token);
    res.json({ token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/inquiry", async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (err) {
    console.error("❌ Error fetching inquiries:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/inquiries", async (req, res) => {
  try {
    console.log("📡 Fetching inquiries from MongoDB..."); // ✅ Debugging log
    const inquiries = await Inquiry.find();
    console.log("✅ Inquiries fetched:", inquiries); // ✅ Debugging log
    res.json(inquiries);
  } catch (err) {
    console.error("❌ Server Error:", err); // ✅ Log full error details
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/inquiry", async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();

    // 📩 Send Confirmation Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newInquiry.email,
      subject: "Inquiry Received",
      text: `Hello ${newInquiry.name},\n\nWe received your request. Our team will contact you soon!`,
    });

    res.status(201).json({ message: "Inquiry submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/api/inquiry/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting inquiry" });
  }
});

// Default Route (Optional)
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the AAA Granite API");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
