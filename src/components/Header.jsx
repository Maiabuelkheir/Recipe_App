import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#001F3F" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#1BB76E" }}>
          <i className="fa-solid fa-utensils"></i> Recipe App
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Recipes" style={{ color: "white" }}>
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart" style={{ color: "white" }}>
                <i className="bi bi-bag-heart text-danger">{cartItems.length}</i>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item d-flex align-items-center text-white me-3">
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.name || "User"}
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout}
                    className="btn text-uppercase fw-bold"
                    style={{ backgroundColor: "#dc3545", color: "white", borderRadius: "5px", padding: "5px 15px" }}>
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn text-uppercase fw-bold" to="/login"
                    style={{ backgroundColor: "#1BB76E", color: "white", borderRadius: "5px", padding: "5px 15px" }}>
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="btn text-uppercase fw-bold" to="/register"
                    style={{ backgroundColor: "#FF5BA5", color: "white", borderRadius: "5px", padding: "5px 15px" }}>
                    <i className="bi bi-person-plus me-1"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
