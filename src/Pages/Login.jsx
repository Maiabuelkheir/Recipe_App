import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === formValues.email &&
      savedUser.password === formValues.password
    ) {
      localStorage.setItem("loggedIn", "true");
      navigate("/Recipes");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <h1 style={{ color: "white" }}>Login</h1>
      <hr style={{ color: "white" }} />
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email" className="text-white">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="password" className="text-white">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        {error && <div className="text-danger">{error}</div>}

        <button type="submit" className="btn btn-primary mt-2 text-white" style={{ backgroundColor: "#1BB76E" }}>
          Login
        </button>
      </form>
    </>
  );
}
