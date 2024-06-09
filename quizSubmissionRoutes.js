import express from 'express';
import QuizSubmission from '../models/QuizSubmission.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quizSubmission = new QuizSubmission({ quizId, answers });
    await quizSubmission.save();
    res.status(201).json({ message: 'Quiz submission saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving quiz submission' });
  }
});

export default router;
