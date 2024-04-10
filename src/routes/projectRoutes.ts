import express from 'express';
import projectController from '../controllers/projectController';
const projectRoutes = express.Router();

projectRoutes.post('/create', projectController.createProject);
projectRoutes.post('/add-user', projectController.addUser);
projectRoutes.get('/get-users', projectController.getUsers);
projectRoutes.get('/get-issues', projectController.getIssues);
projectRoutes.get('/:id', projectController.getProject);

export default projectRoutes;
