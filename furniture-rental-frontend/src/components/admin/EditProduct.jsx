import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", category: "", dailyRate: "", availability: true, description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/furnitures/getbyid/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError("Failed to fetch product details"));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await axios.put(`/furnitures/update/${id}`, form);
      navigate("/admin/products");
    } catch {
      setError("Failed to update product");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <h2>Edit Furniture</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} required />
        <input className="form-control mb-2" name="category" placeholder="Category" value={form.category || ""} onChange={handleChange} required />
        <input className="form-control mb-2" name="dailyRate" placeholder="Daily Rate" type="number" value={form.dailyRate === undefined || form.dailyRate === null ? "" : form.dailyRate} onChange={handleChange} required />
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" name="availability" id="availability" checked={!!form.availability} onChange={handleChange} />
          <label className="form-check-label" htmlFor="availability">Available</label>
        </div>
        <input className="form-control mb-2" name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} />
        <button className="btn btn-success">Update Furniture</button>
      </form>
    </div>
  );
}