import express from "express";
import { parse } from "json2csv";
import Inquiry from "../models/inquiry.js";
import fs from "fs";

const router = express.Router();

router.get("/export", async (req, res) => {
  try {
    const inquiries = await Inquiry.find();

    if (!inquiries.length) {
      return res.status(404).json({ error: "No inquiries found" });
    }

    const fields = ["name", "email", "phone", "material", "address", "installationDate", "message", "status"];
    const csv = parse(inquiries, { fields });

    // Set response headers for CSV download
    res.header("Content-Type", "text/csv");
    res.attachment("inquiries.csv");
    res.send(csv);
  } catch (error) {
    console.error("❌ Error generating CSV:", error);
    res.status(500).json({ error: "Failed to export CSV" });
  }
});

export default router;
