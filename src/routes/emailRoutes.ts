import express from 'express';
import emailController from '../controllers/emailController';

const emailRoutes = express.Router();

emailRoutes.post('/send', emailController.sendEmail);

export default emailRoutes;
