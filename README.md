# quizz_app

# MERN Stack Quiz Application

This project is a **Quiz Application** built using the MERN stack. It includes user registration and authentication features, with secure **JWT-based authentication** and protected routes for enhanced security. The app automatically generates unique quiz questions, displays random answers, and calculates the user's final score.

## Features

- **Registration Page**: Allows users to register with input validation for all fields. User data, including a profile picture, is stored in MongoDB.
- **Login Page**: Secure login using email authentication. JWT tokens ensure a secure session.
- **Protected Routes**: Users cannot access the Profile or Quiz pages without being authenticated.
- **Profile Page**: Displays user details fetched from the backend.
- **Quiz Page**:
  - Dynamically generates unique quiz questions with random operators and numbers.
  - Timer for each question (30 seconds) with automatic validation.
  - Tracks answers and displays correct/incorrect choices after completion.
  - Displays final results with overall score and detailed answers.
- **Result Page**: Displays the user's performance summary for the quiz.
- **Frontend and Backend** in the same repository for seamless integration.

## Installation

Follow these steps to clone, configure, and run the project:

### Prerequisites

- **Node.js** and **npm**
- **MongoDB**

## Environment Configuration

1. Create a `.env` file in the `backend` folder and make sure in backend directory make uploads folder and  configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key

### Cloning the Repository

```bash
git clone URL
cd <repository-folder>



