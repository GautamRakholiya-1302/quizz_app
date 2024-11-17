
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz"; 
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          <Route path="/quiz" element={<PrivateRoute component={Quiz} />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Quiz App</h1>
      <div className="auth-buttons">
        <button className="home-btn" onClick={() => window.location.href = "/register"}>
          Register
        </button>
        <button className="home-btn" onClick={() => window.location.href = "/login"}>
          Login
        </button>
      </div>
    </div>
  );
};

const PrivateRoute = ({ component: Component }) => {
  const token = localStorage.getItem("token"); 
  const isAuthenticated = token ? true : false; 

  if (!isAuthenticated) {
   
    return <Navigate to="/login" />;
  }
  return <Component />;
};


export default App;
