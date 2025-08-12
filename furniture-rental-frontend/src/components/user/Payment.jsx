import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const total = params.get("amount");
  const productId = params.get("productId");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const quantity = params.get("quantity") ? Number(params.get("quantity")) : 1;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Razorpay payment handler (no async directly in event handler)
  const handleRazorpay = (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    // Use inner async function for async/await
    const processPayment = async () => {
      try {
        // 1. Create order on backend
        const { data } = await axios.post("/api/payments/create-order", { amount: total });
        const { orderId, key } = data;

        // 2. Open Razorpay checkout
        const options = {
          key,
          amount: total * 100, // in paise
          currency: "INR",
          name: "Furniture Rental Payment",
          description: "Rental Payment",
          order_id: orderId,
          handler: function (response) {
            // Use another async function for post-payment logic
            (async () => {
              try {
                await axios.post("/api/payments/verify-payment", {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  amount: total,
                });
                // Add rental only after payment success
                const customerId = localStorage.getItem("userId");
                await axios.post("/api/rentals/addrental", {
                  rentalDate: startDate,
                  returnDate: endDate,
                  totalAmount: total,
                  customer: { customerId: Number(customerId) },
                  rentalItems: [
                    {
                      quantity: quantity,
                      furnitureItem: { furnitureId: Number(productId) }
                    }
                  ]
                });
                setMessage("Payment successful and rental added!");
                setTimeout(() => navigate("/rentals"), 2000);
              } catch (err) {
                setError("Payment verified but rental could not be added.");
                console.error("Rental add error:", err, err?.response?.data);
              }
            })();
          },
          prefill: {},
          theme: { color: "#3399cc" },
          modal: {
            ondismiss: function () {
              setLoading(false);
            }
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        setError("Payment failed to initiate");
        console.error("Payment error:", err, err?.response?.data);
      } finally {
        setLoading(false);
      }
    };
    processPayment();
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <h2>Payment</h2>
      <form onSubmit={handleRazorpay}>
        <div className="mb-3 fs-5">Total Amount: <strong>₹{total}</strong></div>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <button className="btn btn-success w-100" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default Payment;