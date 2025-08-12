import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/user/getallusers");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/user/delete/${id}`);
      setUsers(users.filter((u) => u.id !== id && u.customerId !== id));
    } catch {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: 700 }}>
        <div className="card shadow-lg rounded-4 border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
            <h2 className="mb-0 fs-3">Manage Users</h2>
            <span className="badge bg-light text-primary fs-6">Total: {users.length}</span>
          </div>
          <div className="card-body p-0">
            {error && <div className="alert alert-danger m-3">{error}</div>}
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id || u.customerId}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold">{u.name || u.username}</td>
                      <td>{u.email}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id || u.customerId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}