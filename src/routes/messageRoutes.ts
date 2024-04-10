import express from 'express';
import messageController from '../controllers/messageController';

const messageRoutes = express.Router();

messageRoutes.post('/create', messageController.createMessage);
messageRoutes.get('/get-all/:issue_id', messageController.getAllMessages);
messageRoutes.get('/get/:id', messageController.getMessage);

export default messageRoutes;
