import express from 'express';
import issueController from '../controllers/issueController';

const issueRoutes = express.Router();

issueRoutes.post('/create', issueController.createIssue);
issueRoutes.get('/', issueController.getAllIssues);
issueRoutes.put('/close/:id', issueController.closeIssue);
issueRoutes.post('/add-user', issueController.addUser);
issueRoutes.get('/:id', issueController.getIssue);
// issueRoutes.get('/:id/read-receipts', issueController.getReadReceipts);

export default issueRoutes;
