import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategories = () => {
    axios.get("/api/categories")
      .then(res => setCategories(res.data))
      .catch(() => setError("Failed to fetch categories."));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      if (editing) {
        await axios.put(`/api/categories/update/${editing.categoryId}`, { name, description });
        setSuccess("Category updated.");
      } else {
        await axios.post("/api/categories", { name, description });
        setSuccess("Category added.");
      }
      setName(""); setDescription(""); setEditing(null);
      fetchCategories();
    } catch {
      setError("Failed to save category.");
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setName(cat.name);
    setDescription(cat.description);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`/api/categories/delete/${id}`);
      setSuccess("Category deleted.");
      fetchCategories();
    } catch {
      setError("Failed to delete category.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label>Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">{editing ? "Update" : "Add"} Category</button>
        {editing && <button className="btn btn-secondary ms-2" type="button" onClick={() => { setEditing(null); setName(""); setDescription(""); }}>Cancel</button>}
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.categoryId}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(cat)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.categoryId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
