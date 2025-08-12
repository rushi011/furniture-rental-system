import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function ManageRentals() {
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState("");

  const fetchRentals = async () => {
    try {
      const res = await axios.get("/rentals");
      setRentals(res.data);
    } catch {
      setError("Failed to load rentals");
    }
  };

  useEffect(() => { fetchRentals(); }, []);

  return (
    <div className="container">
      <h2>Manage Rentals</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead><tr><th>User</th><th>Product</th><th>Start</th><th>End</th><th>Status</th></tr></thead>
        <tbody>
          {rentals.map(r => (
            <tr key={r.id}>
              <td>{r.user?.username}</td>
              <td>{r.product?.name}</td>
              <td>{r.startDate}</td>
              <td>{r.endDate}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}