import { Link, useNavigate } from "react-router-dom";
import { getAuth, logout } from "../../utils/auth";

export default function Navbar() {
  const { user } = getAuth();
  const navigate = useNavigate();

  // Defensive: get role from user object, fallback to null
  const role = user && user.role ? user.role : null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Furniture Rental</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!role && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
            {role === "ADMIN" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/products">Products</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/users">Users</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/rentals">Rentals</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/categories">Categories</Link></li>
              </>
            )}
            {role === "USER" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/user/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/browse">Browse</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
              </>
            )}
          </ul>
          {role && (
            <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}