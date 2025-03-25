"use client";

import React, { useState } from "react";
import styles from "./inquiry.module.css"; // Import CSS module

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Submitting...");

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
    <div className={styles.inquiryContainer}>
      <h1 className={styles.inquiryTitle}>Request a Quote</h1>
      <p className={styles.inquirySubtitle}>
        Fill out the form below to get started on your project.
      </p>

      {message && <p className={styles.inquiryMessage}>{message}</p>}

      <form className={styles.inquiryForm} onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label htmlFor="address">Installation Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Material Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="material">Material</label>
          <select
            id="material"
            name="material"
            value={formData.material}
            onChange={handleChange}
          >
            <option value="Granite">Granite</option>
            <option value="Marble">Marble</option>
            <option value="Quartz">Quartz</option>
          </select>
        </div>

        {/* Edge Profile */}
        <div className={styles.formGroup}>
          <label htmlFor="edgeProfile">Edge Profile</label>
          <select
            id="edgeProfile"
            name="edgeProfile"
            value={formData.edgeProfile}
            onChange={handleChange}
          >
            <option value="Straight">Straight</option>
            <option value="Beveled">Beveled</option>
            <option value="Rounded">Rounded</option>
          </select>
        </div>

        {/* Color Preference */}
        <div className={styles.formGroup}>
          <label htmlFor="color">Color Preference</label>
          <input
            id="color"
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        {/* Square Footage */}
        <div className={styles.formGroup}>
          <label htmlFor="squareFootage">Square Footage</label>
          <input
            id="squareFootage"
            type="text"
            name="squareFootage"
            value={formData.squareFootage}
            onChange={handleChange}
          />
        </div>

        {/* Sink Cutout */}
        <div className={styles.formGroup}>
          <label htmlFor="sinkCutout">Do you need a sink cutout?</label>
          <select
            id="sinkCutout"
            name="sinkCutout"
            value={formData.sinkCutout}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Measurement Date */}
        <div className={styles.formGroup}>
          <label htmlFor="measurementDate">Preferred Measurement Date</label>
          <input
            id="measurementDate"
            type="date"
            name="measurementDate"
            value={formData.measurementDate}
            onChange={handleChange}
          />
        </div>

        {/* Installation Date */}
        <div className={styles.formGroup}>
          <label htmlFor="installationDate">Preferred Installation Date</label>
          <input
            id="installationDate"
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
          />
        </div>

        {/* Additional Notes */}
        <div className={styles.formGroup}>
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className={styles.submitButton} type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}
