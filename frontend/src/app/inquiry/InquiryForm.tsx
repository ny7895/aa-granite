"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const InquiryForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    contactMethod: "Phone",
    material: "Granite",
    edgeProfile: "Straight",
    color: "",
    squareFootage: "",
    sinkCutout: "No",
    measurementDate: "",
    installationDate: "",
    notes: "",
    estimate: "Yes",
    paymentMethod: "Credit Card",
    financing: "No",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Inquiry submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          contactMethod: "Phone",
          material: "Granite",
          edgeProfile: "Straight",
          color: "",
          squareFootage: "",
          sinkCutout: "No",
          measurementDate: "",
          installationDate: "",
          notes: "",
          estimate: "Yes",
          paymentMethod: "Credit Card",
          financing: "No",
        });
      } else {
        setMessage("Error submitting inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl relative">
      {/* ✅ Back to Home Arrow - Ensuring Visibility */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        Countertop Inquiry Form
      </h2>

      {message && <p className="text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Installation Address"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
