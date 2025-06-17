import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!recipe) {
    return <h2 className="text-center text-light">Loading...</h2>;
  }

  return (
    <div className="container my-5 d-flex justify-content-center ">
      <div
        className="card p-4"
        style={{
          width: "40rem",
          borderRadius: "15px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          src={recipe.image}
          alt={recipe.name}
          className="card-img-top"
          style={{
            height: "300px",
            objectFit: "cover",
            borderRadius: "15px 15px 0 0",
          }}
        />
        <div className="card-body text-center">
          <h3 className="card-title">{recipe.name}</h3>
          <p className="card-text text-muted">{recipe.description}</p>

          {/* Badge for Stock Status */}
          <span
            className={`badge ${recipe.servings < 3 ? "bg-danger" : "bg-success"}`}
            style={{ fontSize: "1rem", padding: "7px 12px" }}
          >
            {recipe.servings < 3 ? "Out of Stock" : "In Stock"}
          </span>

          <hr />

          {/* Recipe Details */}
          <div className="text-start">
          
            <h5 className="mt-3">🥗 Ingredients:</h5>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
