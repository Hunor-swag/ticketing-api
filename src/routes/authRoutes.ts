import express from 'express';
import authController from '../controllers/authController';
const authRoutes = express.Router();

authRoutes.post('/customer/signin', authController.customerSignIn);
authRoutes.post('/customer/signup', authController.customerSignUp);

export default authRoutes;
