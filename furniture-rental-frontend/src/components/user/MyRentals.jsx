import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let customerId = localStorage.getItem("userId");
    if (!customerId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }
    customerId = Number(customerId);
    axios.get(`/api/rentals/customer/${customerId}`)
      .then(res => {
        setRentals(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setError("Failed to fetch your rentals."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>My Rentals</h2>
      {rentals.length === 0 ? (
        <div>No rentals found.</div>
      ) : (
        <div className="row">
          {rentals.map(rental => (
            <div className="col-md-6 mb-4" key={rental.rentalId}>
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  Rental #{rental.rentalId} | Date: {rental.rentalDate}
                </div>
                <div className="card-body">
                  <div><strong>Return Date:</strong> {rental.returnDate}</div>
                  <h6 className="mt-3">Items:</h6>
                  {rental.rentalItems && rental.rentalItems.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {rental.rentalItems.map(item => (
                        <li className="list-group-item" key={item.rentalItemId}>
                          {item.furnitureItem?.name} (Qty: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-muted">No items found for this rental.</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default MyRentals;
