import express from "express";
import { Inquiry } from "../models/inquiry.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();
const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching inquiries', error: err.message });
  }
});

// Submit Inquiry (POST /api/inquiry)
router.post("/", async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "DoubleAGraniteABQ@gmail.com", 
      subject: "New Inquiry Received",
      text: `You have a new inquiry from ${req.body.name}.
      
      📞 Phone: ${req.body.phone}
      ✉️ Email: ${req.body.email}
      📍 Address: ${req.body.address}
      🛠 Material: ${req.body.material}

      Login to your dashboard to view more details.
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Email Error:", error);
      } else {
        console.log("✅ Email Sent: " + info.response);
      }
    });

    res.status(201).json({ message: "Inquiry submitted and email sent!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    console.log(`🔄 Updating inquiry ${id}:`, updateData);

    const inquiry = await Inquiry.findByIdAndUpdate(id, updateData, { new: true });

    if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });

    console.log("✅ Inquiry updated:", inquiry);
    res.json(inquiry);
  } catch (err) {
    console.error("❌ Error updating inquiry:", err);
    res.status(500).json({ error: err.message });
  }
});
// Add new inquiry
router.post('/add', async (req, res) => {
  const { estimatedCompletion, totalCost, laborCost, materialCost } = req.body;

  try {
    const inquiry = new Inquiry({
      estimatedCompletion,
      totalCost,
      laborCost,
      materialCost,
    });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry added successfully', inquiry });
  } catch (err) {
    res.status(400).json({ message: 'Error adding inquiry', error: err.message });
  }
});
router.put('/update/:id', async (req, res) => {
  const { estimatedCompletion, totalCost, laborCost, materialCost } = req.body;

  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { estimatedCompletion, totalCost, laborCost, materialCost },
      { new: true }
    );
    res.status(200).json({ message: 'Inquiry updated successfully', inquiry });
  } catch (err) {
    res.status(400).json({ message: 'Error updating inquiry', error: err.message });
  }
});
export default router;
