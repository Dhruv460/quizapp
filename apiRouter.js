// apiRouter.js
import express from 'express';
import quizRoutes from './quizRoutes.js';
import quizSubmissionRoutes from './quizSubmissionRoutes.js';

const apiRouter = express.Router();

apiRouter.use('/quizzes', quizRoutes);
apiRouter.use('/quiz-submissions', quizSubmissionRoutes);

export default apiRouter;