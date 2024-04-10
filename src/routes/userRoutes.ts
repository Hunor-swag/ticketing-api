import express from 'express';
import userController from '../controllers/userController';
const userRoutes = express.Router();

userRoutes.post('/create', userController.createUser);

userRoutes.get('/', userController.getAllUsers);

userRoutes.get('/get-issues', userController.getIssues);

userRoutes.get('/get-by-email', userController.getUserByEmail);

userRoutes.get('/get-projects', userController.getProjects);

userRoutes.get('/:id', userController.getUserById);

export default userRoutes;
