import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

// Admin
import ManageProducts from "./components/admin/ManageProducts";
import ManageUsers from "./components/admin/ManageUsers";
import ManageRentals from "./components/admin/ManageRentals";
import RentalItems from "./components/admin/RentalItems";
import AddProduct from "./components/admin/AddProduct";
import EditProduct from "./components/admin/EditProduct";
import ManageCategories from "./components/admin/ManageCategories";

// User
import BrowseFurniture from "./components/user/BrowseFurniture";
import RentFurniture from "./components/user/RentFurniture";
import Payment from "./components/user/Payment";

import MyRentals from "./components/user/MyRentals";
import UserProfile from "./components/user/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  {/* Admin routes */}
  <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
  <Route path="/admin/products" element={<ProtectedRoute role="ADMIN"><ManageProducts /></ProtectedRoute>} />
  <Route path="/admin/users" element={<ProtectedRoute role="ADMIN"><ManageUsers /></ProtectedRoute>} />
  <Route path="/admin/rentals" element={<ProtectedRoute role="ADMIN"><ManageRentals /></ProtectedRoute>} />
  <Route path="/admin/categories" element={<ProtectedRoute role="ADMIN"><ManageCategories /></ProtectedRoute>} />
  <Route path="/admin/rentalitems" element={<ProtectedRoute role="ADMIN"><RentalItems /></ProtectedRoute>} />
  <Route path="/addfurniture" element={<AddProduct />} />
  <Route path="/editfurniture/:id" element={<EditProduct />} />
  {/* User routes */}
  <Route path="/user/dashboard" element={<ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>} />
  <Route path="/browse" element={<ProtectedRoute role="USER"><BrowseFurniture /></ProtectedRoute>} />
  <Route path="/rentals" element={<ProtectedRoute role="USER"><MyRentals /></ProtectedRoute>} />
  <Route path="/rentfurniture" element={<ProtectedRoute role="USER"><RentFurniture /></ProtectedRoute>} />
  <Route path="/payment" element={<ProtectedRoute role="USER"><Payment /></ProtectedRoute>} />
  <Route path="/payment/:furnitureId" element={<Payment />} />
  <Route path="/profile" element={<ProtectedRoute role="USER"><UserProfile /></ProtectedRoute>} />
        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  <Footer />
    </BrowserRouter>
  );
}

export default App;