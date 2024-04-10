import { Request, Response } from 'express';
import messageModel from '../models/messageModel';
import { Message } from '../types/typings';

const createMessage = async (req: Request, res: Response) => {
  try {
    const message = req.body as Message;
    const timestamp = new Date();
    message.timestamp = timestamp;
    if (!message) {
      res.status(400).send({ error: 'No message provided' });
    }
    const insertMessageRes = await messageModel.create(message);
    res.send(insertMessageRes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create message' });
  }
};

const getAllMessages = async (req: Request, res: Response) => {
  try {
    const { issue_id } = req.params;
    const messages = await messageModel.getAll(parseInt(issue_id));
    res.send(messages);
  } catch (error) {
    res.status(404).send({ error: 'Messages not found' });
  }
};

const getMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await messageModel.get(parseInt(id));
    res.send(message);
  } catch (error) {
    res.status(404).send({ error: 'Message not found' });
  }
};

export default { createMessage, getAllMessages, getMessage };
