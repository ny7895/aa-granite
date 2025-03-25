import express from "express";
import PDFDocument from "pdfkit";
import Inquiry from "../models/inquiry.js";

const router = express.Router();

router.get("/invoice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    // Create PDF Document
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice_${id}.pdf`);
    
    doc.pipe(res);

    doc.fontSize(20).text("AAA Granite Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Client Name: ${inquiry.name}`);
    doc.text(`Email: ${inquiry.email}`);
    doc.text(`Phone: ${inquiry.phone}`);
    doc.text(`Material: ${inquiry.material}`);
    doc.text(`Address: ${inquiry.address}`);
    doc.text(`Installation Date: ${inquiry.installationDate || "N/A"}`);
    doc.text(`Status: ${inquiry.status}`);
    doc.text(`Notes: ${inquiry.message}`);
    doc.moveDown();
    doc.fontSize(16).text("Total Amount Due: $______"); // Add pricing logic if needed

    doc.end();
  } catch (error) {
    console.error("❌ Error generating invoice:", error);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
});

export default router;
