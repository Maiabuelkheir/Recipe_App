import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../store/slices/cart";

export default function Recipes() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("Current Location: ", location);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/recipes`)
      .then((response) => setRecipes(response.data.recipes))
      .catch((err) => console.log(err));
  }, []);

  const deleteRecipe = (id) => {
    const newRecipe = recipes.filter(recipe => recipe.id !== id);
    setRecipes(newRecipe);
  };

  return (
    <>
      <h1 className="text-center my-4" style={{ color: "white" }}>Recipes List</h1>
      <hr />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4 d-flex flex-wrap">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col mb-4">
              <div
                className="card h-100 p-3 mb-5"
                style={{
                  borderRadius: "0",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="position-relative">
                  <img
                    src={recipe.image}
                    className="card-img-top mx-auto d-block"
                    alt={recipe.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "0",
                    }}
                  />
                  <span
                    className={`badge position-absolute top-0 start-0 m-2 ${recipe.servings < 3 ? "bg-danger" : "bg-warning"}`}
                    style={{ padding: "5px 10px", fontSize: "0.8rem" }}
                  >
                    {recipe.servings < 3 ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                <div className="card-body p-2 text-center">
                  <h5 className="card-title fs-6">{recipe.name}</h5>
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="me-2">{recipe.rating}</span>
                    <div className="text-warning">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi ${recipe.rating >= i + 1 ? "bi-star-fill" : "bi-star"}`}></i>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 d-flex justify-content-between">
                    <Link to={`/Recipes/${recipe.id}`}>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#1BB76E",
                          color: "white",
                          borderRadius: "5px",
                          padding: "5px 15px",
                        }}
                      >
                        View
                      </button>
                    </Link>
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => dispatch(addToCart(recipe))}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="btn"
                      style={{
                        backgroundColor: "#FF5BA5",
                        color: "white",
                        borderRadius: "5px",
                        padding: "5px 15px",
                      }}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
