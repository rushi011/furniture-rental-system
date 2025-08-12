import React, { useState } from "react";
import axios from "../../api/axios";

const FurnitureRentalItems = ({ furnitureId, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  React.useEffect(() => {
    axios.get(`/furnitures/rental-items/${furnitureId}`)
      .then(res => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to fetch rental items."))
      .finally(() => setLoading(false));
  }, [furnitureId]);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rental Items for Furniture #{furnitureId}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : items.length === 0 ? (
              <div>No rental items found for this furniture.</div>
            ) : (
              <ul className="list-group">
                {items.map(item => (
                  <li className="list-group-item" key={item.rentalItemId}>
                    Rental Item ID: {item.rentalItemId} | Quantity: {item.quantity} | Rental ID: {item.rental?.rentalId}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureRentalItems;
