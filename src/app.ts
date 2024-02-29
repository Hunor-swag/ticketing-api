import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import customerRoutes from './routes/customerRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// app.use(express.json());
app.use(bodyParser.json());

app.use('/customers', customerRoutes);

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
