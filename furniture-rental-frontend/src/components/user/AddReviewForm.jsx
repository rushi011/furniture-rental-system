import React, { useState } from "react";
import axios from "../../api/axios";

const AddReviewForm = ({ rentalId, furnitureId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userId = localStorage.getItem("userId");
      await axios.post("/api/reviews/add", {
        rating,
        comment,
        rental: { rentalId },
        user: { customerId: userId },
        furnitureItem: { furnitureId }
      });
      setComment("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="mb-2">
        <label>Rating: </label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="form-select w-auto d-inline-block ms-2">
          {[5,4,3,2,1].map(val => <option key={val} value={val}>{val}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label>Comment: </label>
        <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="form-control" required />
      </div>
      {error && <div className="alert alert-danger py-1">{error}</div>}
      <button className="btn btn-success btn-sm" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Review"}</button>
    </form>
  );
};

export default AddReviewForm;
