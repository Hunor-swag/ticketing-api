import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import issueRoutes from './routes/issueRoutes';
import messageRoutes from './routes/messageRoutes';
import emailRoutes from './routes/emailRoutes';
import readReceiptRoutes from './routes/readReceiptRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// app.use(express.json());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/auth', authRoutes);
app.use('/issues', issueRoutes);
app.use('/messages', messageRoutes);
app.use('/emails', emailRoutes);
app.use('/read-receipts', readReceiptRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
