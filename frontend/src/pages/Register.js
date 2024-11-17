
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; 

const Register = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    birthdate: "",
  });

  const [profilePicture, setProfilePicture] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const submissionData = new FormData();
      for (const key in formData) {
        submissionData.append(key, formData[key]);
      }
      if (profilePicture) {
        submissionData.append("profilePicture", profilePicture);
      }

      const response = await axios.post("http://localhost:5000/api/users/register", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Registration successful!");
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" onChange={handleChange} placeholder="Enter your first name" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} placeholder="Enter your last name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Birthdate</label>
            <input type="date" name="birthdate" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" name="profilePicture" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn-register">
            Register
          </button>
          <p className="switch-page">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
