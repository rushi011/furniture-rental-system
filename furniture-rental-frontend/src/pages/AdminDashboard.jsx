import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Admin Dashboard</h2>
              <p className="card-text mb-4">Welcome, Admin! Here you can manage products and users.</p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                <Link to="/admin/products" className="btn btn-primary btn-lg">Manage Products</Link>
                <Link to="/admin/users" className="btn btn-success btn-lg">Manage Users</Link>
                {/* <Link to="/admin/rentals" className="btn btn-warning btn-lg text-white">Manage Rentals</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
