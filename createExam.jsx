import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CreateExam = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [questions, setQuestions] = useState([{ question: '', options: [], correctAnswer: '' }]);
  const [timer, setTimer] = useState(0);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: [], correctAnswer: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleUpdateQuestion = (index, e) => {
    setQuestions(questions.map((q, i) => (i === index ? { ...q, question: e.target.value } : q)));
  };

  const handleUpdateCorrectAnswer = (index, e) => {
    setQuestions(questions.map((q, i) => (i === index ? { ...q, correctAnswer: e.target.value } : q)));
  };

  const handleUpdateOption = (index, optionIndex, e) => {
    setQuestions(
      questions.map((q, i) => {
        if (i === index) {
          return { ...q, options: q.options.map((o, j) => (j === optionIndex ? e.target.value : o)) };
        }
        return q;
      })
    );
  };

  const handleAddOption = (index) => {
    setQuestions(
      questions.map((q, i) => {
        if (i === index) {
          return { ...q, options: [...q.options, ''] };
        }
        return q;
      })
    );
  };

  const handleRemoveOption = (index, optionIndex) => {
    setQuestions(
      questions.map((q, i) => {
        if (i === index) {
          return { ...q, options: q.options.filter((_, j) => j !== optionIndex) };
        }
        return q;
      })
    );
  };

  const handleSaveExam = async (data) => {
    const quizId = uuidv4(); // Generate a unique UUID
    const quizData = {
      title: data.title,
      timer: timer,
      questions: questions.map((question) => ({
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
      })),
    };

    try {
      const response = await axios.post('http://localhost:3000/api/quizzes', quizData);
      const quizUrl = `http://localhost:3000/quiz/${quizId}`;
      console.log(`Quiz created successfully! URL: ${quizUrl}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Create Exam</h1>
      <form onSubmit={handleSubmit(handleSaveExam)} className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <label className="block mb-2">
          Title:
          <input type="text" {...register('title', { required: true })} className="w-full p-2 pl-10 text-sm text-gray-700" />
          {errors.title && <span className="text-red-500">Title is required</span>}
        </label>
        <br />
        <label className="block mb-2">
          Timer (minutes):
          <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} className="w-full p-2 pl-10 text-sm text-gray-700" />
        </label>
        <br />
        <h2 className="text-2xl font-bold mb-4">Questions</h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">
              Question {index + 1}:
              <input type="text" value={question.question} onChange={(e) => handleUpdateQuestion(index, e)} className="w-full p-2 pl-10 text-sm text-gray-700" />
            </label>
            <br />
            <label className="block mb-2">
              Options:
              <ul className="list-none mb-2">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="mb-2">
                    <input type="text" value={option} onChange={(e) => handleUpdateOption(index, optionIndex, e)} className="w-full p-2 pl-10 text-sm text-gray-700" />
                    <button type="button" onClick={() => handleRemoveOption(index, optionIndex)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Remove Option
                    </button>
                  </li>
                ))}
              </ul>
            </label>
            <br />
            <button type="button" onClick={() => handleAddOption(index)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add Option
            </button>
            <br />
            <label className="block mb-2">
              CorrectAnswer:
              <select value={question.correctAnswer} onChange={(e) => handleUpdateCorrectAnswer(index, e)} className="w-full p-2 pl-10 text-sm text-gray-700">
                <option value="">Select an option</option>
                {question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="button" onClick={() => handleRemoveQuestion(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Remove Question
            </button>
          </div>
        ))}
        <br />
        <button type="button" onClick={handleAddQuestion} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Question
        </button>
        <br />
        <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Save Exam
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
