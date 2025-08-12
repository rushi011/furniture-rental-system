import React from "react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">User Dashboard</h2>
              <p className="card-text mb-4">Welcome! Here you can browse and rent furniture, view your rentals, and manage your profile.</p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                <Link to="/browse" className="btn btn-primary btn-lg">Browse Furniture</Link>
                <Link to="/rentals" className="btn btn-outline-primary btn-lg">My Rentals</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
