import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Quiz.css";


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  
  useEffect(() => {
    const generateQuestions = () => {
      const operators = ["+", "-", "x", "/"];
      const newQuestions = Array.from({ length: 10 }, () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let correctAnswer;
        switch (operator) {
          case "+":
            correctAnswer = num1 + num2;
            break;
          case "-":
            correctAnswer = num1 - num2;
            break;
          case "x":
            correctAnswer = num1 * num2;
            break;
          case "/":
            correctAnswer = num2 !== 0 ? parseFloat((num1 / num2).toFixed(2)) : 0;
            break;
          default:
            correctAnswer = 0;
        }

        const answers = [
          correctAnswer,
          correctAnswer + 1,
          correctAnswer - 1,
          correctAnswer + 2,
        ]
          .sort(() => Math.random() - 0.5) // Shuffle answers
          .slice(0, 4);

        return {
          num1,
          num2,
          operator,
          correctAnswer,
          answers,
        };
      });
      setQuestions(newQuestions);
    };

    generateQuestions();
  }, []);

  // Handle Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion(false);
    }
  }, [timeLeft]);

  // Handle Next Question
  const handleNextQuestion = (isCorrect) => {
    const currentQuestion = questions[currentQuestionIndex];
    setResults((prev) => [
      ...prev,
      {
        question: `${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2}`,
        correctAnswer: currentQuestion.correctAnswer,
        selectedAnswer,
        isCorrect,
      },
    ]);

    if (isCorrect) setScore(score + 1);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
    } else {
      setGameOver(true);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect =
      answer === questions[currentQuestionIndex].correctAnswer;
    handleNextQuestion(isCorrect);
  };

  return (
    <div className="quiz-container">
      {gameOver ? (
        <div className="results">
          <h1>Game Over</h1>
          <p>Your Score: {score} / {questions.length}</p>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>Q{index + 1}:</strong> {result.question} = {result.correctAnswer} <br />
                <strong>Your Answer:</strong> {result.selectedAnswer || "No Answer"} <br />
                <strong>Result:</strong> {result.isCorrect ? "Correct" : "Wrong"}
              </li>
            ))}
          </ul>
          <button onClick={() => navigate("/")}>Return to Home</button>
        </div>
      ) : (
        <div className="question-section">
          <h1>Quiz Time</h1>
          <p>Time Left: {timeLeft} seconds</p>
          <div className="question">
            <h2>
              {questions[currentQuestionIndex]?.num1}{" "}
              {questions[currentQuestionIndex]?.operator}{" "}
              {questions[currentQuestionIndex]?.num2}
            </h2>
          </div>
          <div className="answers">
            {questions[currentQuestionIndex]?.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(answer)}
                disabled={!!selectedAnswer}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
