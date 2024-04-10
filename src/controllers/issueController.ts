import { Request, Response } from 'express';
import issueModel from '../models/issueModel';

const createIssue = async (req: Request, res: Response) => {
  try {
    const issue = req.body;
    const created = new Date();
    issue.created = created;
    console.log(issue);
    if (!issue) {
      res.status(400).send({ error: 'No issue provided' });
    }
    const insertIssueRes = await issueModel.create(issue);
    res.send(insertIssueRes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create issue' });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const issues = await issueModel.getAll();
    res.send(issues);
  } catch (error) {
    res.status(404).send({ error: 'Issues not found' });
  }
};

const closeIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const closeIssueRes = await issueModel.close(parseInt(id));
    res.send(closeIssueRes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to close issue' });
  }
};

const getIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const issue = await issueModel.get(parseInt(id));
    res.send(issue);
  } catch (error) {
    res.status(404).send({ error: 'Issue not found' });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { user_id, issue_id } = req.body;
    const user = await issueModel.addUser(
      parseInt(issue_id),
      parseInt(user_id)
    );
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add user to issue' });
  }
};

// const getReadReceipts = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const readReceipts = await issueModel.getReadReceipts(parseInt(id));
//     res.send(readReceipts);
//   } catch (error) {
//     res.status(404).send({ error: 'Read receipts not found' });
//   }
// };

export default {
  createIssue,
  getAllIssues,
  closeIssue,
  getIssue,
  addUser,
  // getReadReceipts,
};
