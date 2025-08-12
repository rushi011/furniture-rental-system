import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { getAuth } from "../../utils/auth";

export default function UserProfile() {
  const [user, setUser] = useState(getAuth().user);
  const [editUser, setEditUser] = useState(user);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userId = user && (user.customerId || user.id || user.userId); // adjust according to your user object

  useEffect(() => {
    if (!userId) return;
    axios.get(`/user/getbyid/${userId}`)
      .then(res => {
        setUser(res.data);
        setEditUser(res.data);
      })
      .catch(() => setError("Failed to load profile"));
  }, [userId]);

  const handleChange = e => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      await axios.put(`/user/update/${editUser.customerId}`, editUser);
      setUser(editUser);
      setMessage("Profile updated successfully!");
    } catch {
      setError("Failed to update profile");
    }
  };

  if (!editUser) return <div>Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2>My Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" name="name" value={editUser.name || ""} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" value={editUser.email || ""} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input className="form-control" name="phone" value={editUser.phone || ""} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input className="form-control" name="address" value={editUser.address || ""} onChange={handleChange} />
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}