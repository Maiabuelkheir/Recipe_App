import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Recipes from "./Pages/Recipes";
import RecipeDetails from "./Pages/RecipeDetais";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Recipes />
            </ProtectedRoute>
          } />
          <Route path="/Recipes" element={
            <ProtectedRoute>
              <Recipes />
            </ProtectedRoute>
          } />
          <Route path="/Recipes/:id" element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
