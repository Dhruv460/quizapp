import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizSubmissionSchema = new Schema({
  quizId: String,
  answers: Object
});

const QuizSubmission = mongoose.model('QuizSubmission', quizSubmissionSchema);

export default QuizSubmission;
