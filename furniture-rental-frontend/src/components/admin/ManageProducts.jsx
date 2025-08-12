import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", dailyRate: "", category: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/furnitures/getallfurnitures");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/furnitures/${editing}`, form);
      } else {
        await axios.post("/furnitures", form);
      }
      setForm({ name: "", dailyRate: "", category: "", description: "" });
      setEditing(null);
      fetchProducts();
    } catch {
      setError("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    navigate(`/editfurniture/${product.furnitureId}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this furniture item?")) return;
    try {
      await axios.delete(`/furnitures/delete/${id}`);
      fetchProducts();
      setError(""); // Clear any previous error
    } catch (err) {
      console.error(err); // Log the actual error
      setError("Failed to delete product");
    }
  };

  return (
    <div className="container">
      <h2>Manage Furniture</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {products.map(p => (
          <div className="col-md-4 mb-3" key={p.furnitureId}>
            <div className="card">
              {p.imageBase64 && (
                <img
                  src={`data:image/jpeg;base64,${p.imageBase64}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: 200, objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">Category: {p.category}</p>
                <p className="card-text">Daily Rate: ₹{p.dailyRate}</p>
                <p className="card-text">{p.description}</p>
                <button className="btn btn-sm btn-primary me-2" onClick={() => navigate(`/editfurniture/${p.furnitureId}`)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.furnitureId)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/addfurniture" className="btn btn-primary">
          Add Furniture
        </Link>
      </div>
    </div>
  );
}