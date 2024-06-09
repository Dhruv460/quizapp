import express from 'express';
import Quiz from '../models/Quiz.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, timer, questions } = req.body;
    const quizId = uuidv4(); // Generate a new UUID for the quiz
    const quiz = new Quiz({ title, timer, questions, quizId });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quizId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes.map((quiz) => ({ ...quiz._doc, quizUrl: `http://localhost:3000/quiz/${quiz.quizId}` })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving quizzes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizId: req.params.id });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving quiz' });
  }
});

export default router;
