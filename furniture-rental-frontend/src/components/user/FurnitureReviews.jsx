import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const FurnitureReviews = ({ furnitureId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!furnitureId) return;
    setLoading(true);
    axios.get(`/api/reviews/furniture/${furnitureId}`)
      .then(res => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to fetch reviews."))
      .finally(() => setLoading(false));
  }, [furnitureId]);

  return (
    <div className="mt-3">
      <h5>Reviews</h5>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : reviews.length === 0 ? (
        <div>No reviews yet for this item.</div>
      ) : (
        <ul className="list-group">
          {reviews.map(r => (
            <li className="list-group-item" key={r.reviewId}>
              <strong>Rating:</strong> {r.rating} / 5<br />
              <strong>Comment:</strong> {r.comment}<br />
              <span style={{ fontSize: "0.9em", color: "#888" }}>
                By User #{r.user?.customerId}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FurnitureReviews;
