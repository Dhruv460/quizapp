import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateExam from './components/createExam';
import QuizPage from './components/QuizPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateExam />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;