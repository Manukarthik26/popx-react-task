import React, { useState } from "react";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isFormatValid = validateForm();

    if (!isFormatValid) {
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("userProfile") || "{}");

    if (
      savedUser.email === formData.email.trim() &&
      savedUser.password === formData.password
    ) {
      window.location.href = "/profile";
    } else {
      setErrors((prev) => ({
        ...prev,
        general: "Invalid email or password",
      }));
    }
  };

  const isFormValid =
    formData.email.trim() &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.password.trim().length >= 6;

  return (
    <div className="login-container">
      <div className="content-wrapper">
        <h1 className="title">
          Signin to your <br />
          PopX account
        </h1>
        <p className="subtitle">
          Lorem ipsum dolor sit amet, <br />
          consectetur adipiscing elit,
        </p>

        {/* Email */}
        <div className="form-group">
          <label className="label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter email address"
            className="input-field"
          />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        {/* Password with toggle */}
        <div className="form-group password-group">
          <label className="label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              className="input-field"
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>

        <button
          className={`btn login-btn ${isFormValid ? "valid" : "disabled"}`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Login
        </button>

        {errors.general && (
          <p className="error general-error">{errors.general}</p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
