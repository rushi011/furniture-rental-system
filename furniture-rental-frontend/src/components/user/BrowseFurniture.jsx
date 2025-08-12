import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
// import FurnitureRentalItems from "./FurnitureRentalItems";
// import FurnitureReviews from "./FurnitureReviews";
import { addFavorite } from "../../utils/favorite";
import { getAuth } from "../../utils/auth";

const BrowseFurniture = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/furnitures/getallfurnitures");
        setProducts(res.data);
      } catch (err) {
        setError("Could not fetch furniture. Please ensure the backend is running.");
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
      } catch {
        // ignore category fetch error
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch favorite status for all products after products are loaded
  useEffect(() => {
    const fetchFavorites = async () => {
      const { user } = getAuth();
      if (!user || !user.userId) return;
      const status = {};
      for (const p of products) {
        try {
          const res = await axios.get(`/api/favorites/isFavorite?userId=${user.userId}&furnitureItemId=${p.furnitureId}`);
          status[p.furnitureId] = res.data === true;
        } catch {
          status[p.furnitureId] = false;
        }
      }
      setFavoriteStatus(status);
    };
    if (products.length > 0) fetchFavorites();
  }, [products]);

  const handleToggleFavorite = async (furnitureItemId) => {
    const { user } = getAuth();
    if (!user || !user.userId) {
      alert("Please login to use favorites.");
      return;
    }
    const isFav = favoriteStatus[furnitureItemId];
    try {
      if (isFav) {
        await axios.delete(`/api/favorites/remove?userId=${user.userId}&furnitureItemId=${furnitureItemId}`);
        setFavoriteStatus({ ...favoriteStatus, [furnitureItemId]: false });
      } else {
        await axios.post(`/api/favorites/add?userId=${user.userId}&furnitureItemId=${furnitureItemId}`);
        setFavoriteStatus({ ...favoriteStatus, [furnitureItemId]: true });
      }
    } catch (err) {
      alert("Failed to update favorite status.");
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category && (p.category.name === selectedCategory || p.category === selectedCategory))
    : products;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Browse Furniture</h2>
      <div className="mb-3">
        <label htmlFor="categoryDropdown" className="form-label">Filter by Category:</label>
        <select
          id="categoryDropdown"
          className="form-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.categoryId || cat.id || cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="row">
        {filteredProducts.map((p) => (
          <div className="col-md-4 mb-3" key={p.furnitureId}>
            <div className="card">
              {p.imageBase64 && (
                <img
                  src={`data:image/jpeg;base64,${p.imageBase64}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: 200, objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">Category: {p.category && p.category.name ? p.category.name : p.category}</p>
                <p className="card-text">Price per day: ₹{p.dailyRate}</p>
                <Link to={`/rentfurniture?productId=${p.furnitureId}`} className="btn btn-primary me-2">
                  Rent
                </Link>
                <button
                  className={`btn me-2 ${favoriteStatus[p.furnitureId] ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={() => handleToggleFavorite(p.furnitureId)}
                >
                  {favoriteStatus[p.furnitureId] ? "♥ Remove Favorite" : "♡ Add Favorite"}
                </button>
                {/* <FurnitureReviews furnitureId={p.furnitureId} /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
  {/* Show Rental Items modal removed as per cleanup */}
    </div>
  );
};

export default BrowseFurniture;
