// Register.jsx - Updated for backend troubleshooting and better error display
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const payload = {
        name: form.name,
        email: form.email, // <-- add this line
        phone: form.phone,
        address: form.address,
        authentication: {
          email: form.email,
          password: form.password,
          role: "USER"
        }
      };
      // Log payload for debugging
      console.log("Register payload:", payload);
      const res = await axios.post("/user/register", payload);
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // Show more error details for debugging
      let msg = "Registration failed";
      if (err.response) {
        msg += ": " + (err.response.data?.message || JSON.stringify(err.response.data));
        // Optionally log full error
        console.error("Backend error:", err.response);
      } else {
        msg += ": " + err.message;
      }
      setError(msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Register</h2>
  {error && <div className="alert alert-danger" style={{whiteSpace:'pre-wrap'}}>{error}</div>}
{/* // Troubleshooting tips:
// 1. Make sure backend is running and accessible at http://localhost:8080
// 2. Check backend console/logs for error details if registration fails (500 error)
// 3. Ensure MySQL is running and tables are up-to-date
// 4. Confirm payload structure matches backend expectations (see console.log above) */}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
