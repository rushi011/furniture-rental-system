
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function RentFurniture() {
  const [product, setProduct] = useState(null);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const query = new URLSearchParams(useLocation().search);
  const productId = query.get("productId");
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:8080/furnitures/getbyid/${productId}`)
        .then(res => setProduct(res.data))
        .catch(() => setError("Product not found"));
    }
  }, [productId]);

  const handleChange = e => {
    const newDates = { ...dates, [e.target.name]: e.target.value };
    setDates(newDates);
    // Calculate total if both dates are selected
    if (product && newDates.startDate && newDates.endDate) {
      const start = new Date(newDates.startDate);
      const end = new Date(newDates.endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      if (days > 0) {
        setTotal(days * product.dailyRate * quantity);
      } else {
        setTotal(0);
      }
    } else {
      setTotal(0);
    }
  };

  // Update total if quantity changes
  useEffect(() => {
    if (product && dates.startDate && dates.endDate) {
      const start = new Date(dates.startDate);
      const end = new Date(dates.endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      if (days > 0) {
        setTotal(days * product.dailyRate * quantity);
      } else {
        setTotal(0);
      }
    }
  }, [quantity, product, dates.startDate, dates.endDate]);

  const handlePay = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    // Navigate to payment page with total and rental info, including quantity
    navigate(`/payment?productId=${productId}&startDate=${dates.startDate}&endDate=${dates.endDate}&amount=${total}&quantity=${quantity}`);
  };

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2>Rent: {product.name}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handlePay}>
        <label>Start Date</label>
        <input className="form-control mb-2" type="date" name="startDate" value={dates.startDate} onChange={handleChange} required />
        <label>End Date</label>
        <input className="form-control mb-2" type="date" name="endDate" value={dates.endDate} onChange={handleChange} required />
        <label>Quantity</label>
        <input className="form-control mb-2" type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} required />
        <div className="mb-2">Total Amount: <strong>₹{total}</strong></div>
        <button className="btn btn-primary w-100" type="submit" disabled={total <= 0}>Pay</button>
      </form>
    </div>
  );
}