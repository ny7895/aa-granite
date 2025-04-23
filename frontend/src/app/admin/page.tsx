"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import styles from "./admin.module.css"; // ✅ Import styles

interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  material: string;
  edgeProfile: string;
  color?: string;
  squareFootage?: string;
  sinkCutout: string;
  measurementDate?: string;
  installationDate?: string;
  notes?: string;
  estimate?: string;
  paymentMethod?: string;
  financing?: string;
  status: "Pending" | "In Progress" | "Completed";
  materialsUsed?: string[];
  laborCost?: number;
  materialCost?: number;
  totalCost?: number;
  progressNotes?: string;
  paymentStatus: "Pending" | "Partially Paid" | "Paid";
  materialsObtained: boolean;
  depositMade: boolean;
  estimatedCompletionDate?: string;
  createdAt?: string;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

const AdminDashboard = () => {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    console.log("📡 Fetching inquiries from:", `${apiUrl}/inquiry`);

    try {
      const response = await fetch(`${apiUrl}/inquiry`);
      if (!response.ok) throw new Error("Failed to fetch inquiries");
      const data = await response.json();
      console.log("✅ Inquiries loaded:", data);
      setInquiries(data);
    } catch (error) {
      console.error("❌ Error fetching inquiries:", error);
    }
  };

  const updateMaterialCost = async (id: string, cost: number) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialCost: cost }),
      });

      if (!response.ok) throw new Error("Failed to update material cost");

      // ✅ Update UI after successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, materialCost: cost } : inquiry
        )
      );
    } catch (error) {
      console.error("❌ Error updating material cost:", error);
    }
  };

  const updateTotalCost = async (id: string, cost: number) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalCost: cost }),
      });

      if (!response.ok) throw new Error("Failed to update total cost");

      // ✅ Update UI after successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, totalCost: cost } : inquiry
        )
      );
    } catch (error) {
      console.error("❌ Error updating total cost:", error);
    }
  };

  const updateEstimatedCompletion = async (id: string, date: string) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estimatedCompletionDate: date }),
      });

      if (!response.ok)
        throw new Error("Failed to update estimated completion");

      // ✅ Update UI after successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id
            ? { ...inquiry, estimatedCompletionDate: date }
            : inquiry
        )
      );
    } catch (error) {
      console.error("❌ Error updating estimated completion:", error);
    }
  };

  const updateInquiry = async (id: string, data: Partial<Inquiry>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to update inquiry");

      console.log("✅ Inquiry updated successfully!");
      fetchInquiries(); // Refresh UI
    } catch (error) {
      console.error("❌ Error updating inquiry:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    const inquiryToUpdate = inquiries.find((inquiry) => inquiry._id === id);

    if (!inquiryToUpdate) {
      console.error("Inquiry not found");
      return;
    }

    const { materialCost, totalCost, estimatedCompletionDate } =
      inquiryToUpdate;

    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialCost,
          totalCost,
          estimatedCompletionDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update inquiry");
      }

      // Update UI after successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id
            ? { ...inquiry, materialCost, totalCost, estimatedCompletionDate }
            : inquiry
        )
      );

      alert("Inquiry updated successfully!");
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("❌ Failed to delete inquiry");
      }

      // ✅ Remove the deleted inquiry from the UI
      setInquiries((prev) => prev.filter((inquiry) => inquiry._id !== id));

      console.log(`✅ Successfully deleted inquiry with ID: ${id}`);
    } catch (error) {
      console.error("❌ Error deleting inquiry:", error);
    }
  };

  // ✅ Handle Logout
  const handleLogout = async () => {
    await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.replace("/login");
  };

  // ✅ Update Inquiry Status
  const updateStatus = async (id: string, newStatus: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api"; // Ensure correct API URL

    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      console.log("✅ Status updated successfully!");
      fetchInquiries(); // Refresh the inquiry list
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  const toggleMaterialsObtained = async (id: string, value: boolean) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialsObtained: value }),
      });

      if (!response.ok) throw new Error("Failed to update materialsObtained");

      // ✅ Update UI after successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id
            ? { ...inquiry, materialsObtained: value }
            : inquiry
        )
      );
    } catch (error) {
      console.error("❌ Error updating materialsObtained:", error);
    }
  };
  const toggleDepositMade = async (id: string, value: boolean) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depositMade: value }),
      });

      if (!response.ok) throw new Error("Failed to update depositMade");

      // ✅ Update UI after successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, depositMade: value } : inquiry
        )
      );
    } catch (error) {
      console.error("❌ Error updating depositMade:", error);
    }
  };
  const updateProgressNotes = async (id: string, notes: string) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progressNotes: notes }),
      });

      if (!response.ok) throw new Error("Failed to update progress notes");

      // ✅ Update UI after successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, progressNotes: notes } : inquiry
        )
      );
    } catch (error) {
      console.error("❌ Error updating progress notes:", error);
    }
  };
  const updatePaymentStatus = async (
    id: string,
    status: "Pending" | "Partially Paid" | "Paid"
  ) => {
    try {
      const response = await fetch(`${apiUrl}/inquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: status }),
      });

      if (!response.ok) {
        throw new Error("❌ Failed to update payment status");
      }

      // ✅ Update UI after successful API update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, paymentStatus: status } : inquiry
        )
      );

      console.log(`✅ Payment status updated to ${status} for inquiry ${id}`);
    } catch (error) {
      console.error("❌ Error updating payment status:", error);
    }
  };

  // ✅ Export to CSV
  const exportCSV = () => {
    let csv =
      "Name,Email,Phone,Material,Address,Installation Date,Message,Status\n";
    inquiries.forEach((inquiry) => {
      csv += `${inquiry.name},${inquiry.email},${inquiry.phone},${
        inquiry.material
      },${inquiry.address},${inquiry.installationDate || "N/A"},$,${
        inquiry.status
      }\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inquiries.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Generate Invoice (Placeholder for now)
  const generateInvoice = (inquiry: Inquiry) => {
    alert(`Generating invoice for ${inquiry.name}...`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>📋 Admin Dashboard</h1>
      <button className={styles.exportButton} onClick={exportCSV}>
        📄 Export CSV
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Submitted</th>
            <th>Material</th>
            <th>Edge Profile</th>
            <th>Color</th>
            <th>Square Footage</th>
            <th>Sink Cutout</th>
            <th>Measurement Date</th>
            <th>Installation Date</th>
            <th>Address</th>
            <th>Status</th>
            <th>Materials Obtained?</th>
            <th>Deposit Made?</th>
            <th>Estimated Completion</th>
            <th>Total Cost</th>
            <th>Labor Cost</th>
            <th>Material Cost</th>
            <th>Progress Notes</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index}>
              <td>{inquiry.name}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.phone}</td>
              <td>
                {inquiry.createdAt
                  ? new Date(inquiry.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{inquiry.material}</td>
              <td>{inquiry.edgeProfile}</td>
              <td>{inquiry.color || "N/A"}</td>
              <td>{inquiry.squareFootage || "N/A"}</td>
              <td>{inquiry.sinkCutout}</td>
              <td>
                {inquiry.measurementDate
                  ? new Date(inquiry.measurementDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {inquiry.installationDate
                  ? new Date(inquiry.installationDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{inquiry.address}</td>

              {/* Status Dropdown */}
              <td>
                <label htmlFor={`status-${index}`} className="status">
                  Status
                </label>
                <select
                  id={`status-${index}`}
                  value={inquiry.status}
                  onChange={(e) =>
                    updateStatus(
                      inquiry._id,
                      e.target.value as Inquiry["status"]
                    )
                  }
                >
                  <option className={styles.statusDropdown} value="Pending">
                    Pending
                  </option>
                  <option className={styles.statusDropdown} value="In Progress">
                    In Progress
                  </option>
                  <option className={styles.statusDropdown} value="Completed">
                    Completed
                  </option>
                </select>
              </td>

              {/* Materials Obtained Toggle */}
              <td>
                <label htmlFor={`materialsObtained-${index}`}>
                  <input
                    id={`materialsObtained-${index}`}
                    type="checkbox"
                    checked={inquiry.materialsObtained}
                    onChange={() =>
                      toggleMaterialsObtained(
                        inquiry._id,
                        !inquiry.materialsObtained
                      )
                    }
                  />
                  Materials Obtained
                </label>
              </td>

              {/* Deposit Made Toggle */}
              <td>
                <label htmlFor={`depositMade-${index}`}>
                  <input
                    id={`depositMade-${index}`}
                    type="checkbox"
                    checked={inquiry.depositMade}
                    onChange={() =>
                      toggleDepositMade(inquiry._id, !inquiry.depositMade)
                    }
                  />
                  Deposit Made
                </label>
              </td>

              {/* Estimated Completion Editable */}
              <td>
                <label htmlFor={`estimatedCompletion-${index}`}>
                  <input
                    id={`estimatedCompletion-${index}`}
                    type="date"
                    value={inquiry.estimatedCompletionDate || ""}
                    onChange={(e) =>
                      updateEstimatedCompletion(inquiry._id, e.target.value)
                    }
                  />
                  Estimated Completion
                </label>
              </td>

              {/* Total Cost Editable */}
              <td>
                <label htmlFor={`totalCost-${index}`}>
                  <input
                    id={`totalCost-${index}`}
                    type="number"
                    value={inquiry.totalCost || ""}
                    onChange={(e) =>
                      updateTotalCost(inquiry._id, parseFloat(e.target.value))
                    }
                  />
                  Total Cost
                </label>
              </td>

              {/* Labor Cost */}
              <td>${inquiry.laborCost || "N/A"}</td>

              {/* Material Cost Editable */}
              <td>
                <label htmlFor={`materialCost-${index}`}>
                  <input
                    id={`materialCost-${index}`}
                    type="number"
                    value={inquiry.materialCost || ""}
                    onChange={(e) =>
                      updateMaterialCost(
                        inquiry._id,
                        parseFloat(e.target.value)
                      )
                    }
                  />
                  Material Cost
                </label>
              </td>

              {/* Progress Notes Input */}
              <td>
                <label
                  htmlFor={`progressNotes-${index}`}
                  className="visually-hidden"
                >
                  Progress Notes
                </label>
                <textarea
                  id={`progressNotes-${index}`}
                  value={inquiry.progressNotes || ""}
                  onChange={(e) =>
                    updateProgressNotes(inquiry._id, e.target.value)
                  }
                />
              </td>

              {/* Payment Status Dropdown */}
              <td>
                <label
                  htmlFor={`paymentStatus-${index}`}
                  className="visually-hidden"
                >
                  Payment Status
                </label>
                <select
                  id={`paymentStatus-${index}`}
                  value={inquiry.paymentStatus}
                  onChange={(e) =>
                    updatePaymentStatus(
                      inquiry._id,
                      e.target.value as Inquiry["paymentStatus"]
                    )
                  }
                >
                  <option
                    className={styles.paymentStatusDropdown}
                    value="Pending"
                  >
                    Pending
                  </option>
                  <option
                    className={styles.paymentStatusDropdown}
                    value="Partially Paid"
                  >
                    Partially Paid
                  </option>
                  <option className={styles.paymentStatusDropdown} value="Paid">
                    Paid
                  </option>
                </select>
              </td>

              {/* Actions */}
              <td>
                <button
                  className={styles.invoiceButton}
                  onClick={() => generateInvoice(inquiry)}
                >
                  Invoice
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteInquiry(inquiry._id)}
                >
                  Delete
                </button>
                <button
                  className={styles.updateButton}
                  onClick={() => handleUpdate(inquiry._id)} // Call the update function
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.logoutButton} onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
