import { useState } from "react";
import axios from "../api/axios";
import { setAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/authusers/signin", {
        email: form.username,
        password: form.password
      });
      console.log("Login response:", res.data);
      // Try to get userId from multiple possible keys
      const userId = res.data.userId || res.data.customerId || res.data.id;
      setAuth(res.data.jwtToken, { userId, role: res.data.role });
      if (res.data.role === "ADMIN") navigate("/admin/dashboard");
      else if (res.data.role === "USER") navigate("/user/dashboard");
      else setError("Unknown role: " + res.data.role);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}