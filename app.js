import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import quizRoutes from './routes/quizRoutes.js';
import quizSubmissionRoutes from './routes/quizSubmissionRoutes.js';
import apiRouter from './routes/apiRouter.js';
import serveStatic from 'serve-static';

dotenv.config();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const dbName = 'mydatabase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log(`Connected to ${dbName} database`))
 .catch((error) => {
    console.error(`Error connecting to ${dbName} database: ${error}`);
    process.exit(1); // Exit the process if the connection fails
  });

app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-submissions', quizSubmissionRoutes);
app.use('/api', apiRouter);

// Serve the static files from the build folder
app.use(serveStatic(path.join(__dirname, 'build')));

// Catch-all route to serve the React app for any other requests
app.use('*', (req, res) => {
  if (req.url === '/index.html') {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    // Let other routes or middleware handle the request
    next();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});