
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData); 
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleStartQuiz = () => {
    navigate("/quiz"); 
  };

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome, {user.firstName} {user.lastName}!</h1>
        <div className="profile-pic-container">
          {/* Display profile picture if available */}
          {user.profilePicture && (
            <img
              src={`http://localhost:5000/uploads/${user.profilePicture}`} 
              alt="Profile"
              className="profile-pic"
            />
          )}
        </div>
      </div>
      <div className="profile-info">
        <div className="info-item">
          <strong>Email:</strong>
          <p>{user.email}</p>
        </div>
        <div className="info-item">
          <strong>Phone:</strong>
          <p>{user.phoneNumber}</p>
        </div>
        <div className="info-item">
          <strong>Birthdate:</strong>
          <p>{new Date(user.birthdate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="start-quiz-btn">
        <button onClick={handleStartQuiz}>Start Quiz</button>
      </div>
    </div>
  );
};

export default Profile;
