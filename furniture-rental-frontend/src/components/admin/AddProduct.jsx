import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    dailyRate: "",
    availability: true,
    imageFile: null
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setForm(f => ({ ...f, imageFile: file }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("dailyRate", form.dailyRate);
      data.append("availabilty", form.availability);
      data.append("imageFile", form.imageFile);

      const res = await axios.post("/furnitures/addfurniture", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.status === 201 || res.status === 200) {
        navigate("/admin/products");
      } else {
        setError("Failed to add furniture item");
      }
    } catch (err) {
      setError("Failed to add furniture item");
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <h2>Add Furniture</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="dailyRate"
          placeholder="Daily Rate"
          type="number"
          value={form.dailyRate}
          onChange={handleChange}
          required
        />
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="availability"
            id="availability"
            checked={form.availability}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="availability">
            Available
          </label>
        </div>
        <input
          className="form-control mb-2"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button className="btn btn-success">Add Furniture</button>
      </form>
    </div>
  );
}