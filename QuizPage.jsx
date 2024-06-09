import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/quizzes/${id}`)
      .then(response => {
        setQuiz(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      fetch('/api/quizzes')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error));
  }, [id]);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleSubmit = () => {
    const quizSubmissionData = {
      quizId: id,
      answers,
      score: calculateScore(answers, quiz.questions),
    };
    axios.post('http://localhost:3000/api/quiz-submissions', quizSubmissionData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Helper function to calculate the score
  const calculateScore = (answers, questions) => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // Render quiz questions and options
  return (
    <div>
      {quiz && (
        <div>
          <h2>{quiz.title}</h2>
          {quiz.questions.map((question, index) => (
            <div key={index}>
              <h3>Question {index + 1}</h3>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
