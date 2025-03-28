import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  material: { type: String, required: true },
  edgeProfile: { type: String, required: true },
  color: { type: String },
  squareFootage: { type: String },
  knowsSquareFootage: {type: String},
  sinkCutout: { type: String, required: true },
  measurementDate: { type: String },
  installationDate: { type: String },
  notes: { type: String },
  estimate: { type: String },
  paymentMethod: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  materialsUsed: [{ type: String }],  // Store materials
  laborCost: Number,
  materialCost: Number,
  totalCost: Number,
  progressNotes: { type: String },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Partially Paid"], default: "Pending" },
  materialsObtained: { type: Boolean, default: false },
  depositMade: { type: Boolean, default: false },
  estimatedCompletionDate: { type: Date },
}, { timestamps: true });

export const Inquiry = mongoose.model("Inquiry", InquirySchema);
export default Inquiry; // ✅ Use default export
