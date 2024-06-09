// QuestionComponent.js
import React from 'react';

const QuestionComponent = ({ question, onChange, currentIndex }) => {
  return (
    <div>
      <h3>{question.question}</h3>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              name={`question-${currentIndex}`}
              value={option}
              onChange={onChange}
            />
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionComponent;