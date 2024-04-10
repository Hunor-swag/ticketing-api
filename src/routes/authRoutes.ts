import express from 'express';
import authController from '../controllers/authController';
const authRoutes = express.Router();

authRoutes.post('/signin', authController.signIn);
authRoutes.post('/signup', authController.signUp);
authRoutes.post('/verifyToken', authController.verifyToken);

export default authRoutes;
