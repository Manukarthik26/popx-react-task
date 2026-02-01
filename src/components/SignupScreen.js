import React, { useState } from 'react';
import './SignupScreen.css';

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: true,
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, type, } = e.target;

    if (type === 'radio') {
      setFormData((prev) => ({ ...prev, isAgency: value === 'yes' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

 // Clear error when user starts typing again
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };



  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
            // Save data to localStorage so Profile can read it
      localStorage.setItem('userProfile', JSON.stringify(formData));

      // Simulate success → go to profile
      window.location.href = '/profile';
      // Or better: use useNavigate from react-router-dom
      // const navigate = useNavigate();
      // navigate('/profile');
    }
  };

   // Simple check: button disabled if any required field is empty
  const isFormValid =
    formData.fullName.trim() &&
    formData.phone.trim() &&
    formData.email.trim() &&
    formData.password.trim().length >= 6;


  return (
    <div className="signup-container">
      <div className="header">
        <h1 className="title">
          Create your <br />
          PopX account
        </h1>
      </div>

      <div className="content-wrapper">
        {/* Full Name */}
        <div className="form-group">
          <label className="label required">Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Marry Doe"
            className="input-field"
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        {/* Phone number */}
        <div className="form-group">
          <label className="label required">Phone number*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"  // better realistic placeholder
            className="input-field"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* Email address */}
        <div className="form-group">
          <label className="label required">Email address*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="marrydoe@example.com"
            className="input-field"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="label required">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="input-field"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {/* Company name (optional) */}
        <div className="form-group">
          <label className="label">Company name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name (optional)"
            className="input-field"
          />
          {/* No error for optional field */}
        </div>

        {/* Are you an Agency? */}
        <div className="form-group radio-group">
          <label className="label required">Are you an Agency?*</label>
          <div className="radio-options">
            <label className="radio-label">
              <input
                type="radio"
                name="agency"
                value="yes"
                checked={formData.isAgency}
                onChange={handleChange}
              />
              <span className={formData.isAgency ? 'radio-selected' : ''}>Yes</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="agency"
                value="no"
                checked={!formData.isAgency}
                onChange={handleChange}
              />
              <span className={!formData.isAgency ? 'radio-selected' : ''}>No</span>
            </label>
          </div>
          {/* You can add error if you want to enforce selection */}
          {/* {errors.isAgency && <p className="error">{errors.isAgency}</p>} */}
        </div>

        {/* <button 
          className="btn create-btn"
          onClick={handleSubmit}
        >
          Create Account
        </button> */}
              <button 
          className={`btn create-btn ${!isFormValid ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignupScreen;