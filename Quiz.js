import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizSchema = new Schema({
  title: String,
  timer: Number,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String
  }],
  quizId: String
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
