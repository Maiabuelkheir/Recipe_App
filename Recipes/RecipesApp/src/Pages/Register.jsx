import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    nameError: null,
    usernameError: null,
    emailError: null,
    passwordError: null,
  });

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    setFormErrors({
      ...formErrors,
      [name + "Error"]:
        name === "name"
          ? value.trim() === ""
            ? "Name is required"
            : null
          : name === "username"
          ? value.trim() === ""
            ? "Username is required"
            : value.includes(" ")
            ? "Username should not contain spaces"
            : null
          : name === "email"
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? null
            : "Invalid email format"
          : name === "password"
          ? /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}/.test(value)
            ? null
            : "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
          : formErrors[name + "Error"],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formErrors.nameError &&
      !formErrors.usernameError &&
      !formErrors.emailError &&
      !formErrors.passwordError
    ) {
      const user = {
        name: formValues.name,
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/login");
    }
  };

  return (
    <>
      <h1 style={{ color: "white" }}>Register</h1>
      <hr style={{ color: "white" }} />

      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name" className="text-white">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formValues.name}
            onChange={handleChangeForm}
            placeholder="Enter your name"
          />
          {formErrors.nameError && <div className="form-text text-danger">{formErrors.nameError}</div>}
        </div>

        <div className="form-group my-2">
          <label htmlFor="username" className="text-white">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formValues.username}
            onChange={handleChangeForm}
            placeholder="Enter your username"
          />
          {formErrors.usernameError && <div className="form-text text-danger">{formErrors.usernameError}</div>}
        </div>

        <div className="form-group my-2">
          <label htmlFor="email" className="text-white">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formValues.email}
            onChange={handleChangeForm}
            placeholder="Enter your email"
          />
          {formErrors.emailError && <div className="form-text text-danger">{formErrors.emailError}</div>}
        </div>

        <div className="form-group my-2">
          <label htmlFor="password" className="text-white">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formValues.password}
            onChange={handleChangeForm}
            placeholder="Enter your password"
          />
          {formErrors.passwordError && <div className="form-text text-danger">{formErrors.passwordError}</div>}
        </div>

        <button type="submit" className="btn btn-primary mt-2 text-white" style={{ backgroundColor: "#1BB76E" }}>
          Submit
        </button>
      </form>
    </>
  );
}
