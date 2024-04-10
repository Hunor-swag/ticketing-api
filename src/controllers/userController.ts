import express, { Request, Response } from 'express';
import userModel from '../models/userModel';

const createUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    console.log(firstname, lastname, email, password);
    const created = new Date();
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password,
      subscribed: false,
      created,
    });
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user' });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.getAll();
    res.send(users);
  } catch (error) {
    res.status(404).send({ error: 'Users not found' });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const user = await userModel.findByEmail(email);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
    } else res.send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: 'User not found' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await userModel.findById(parseInt(id));
    res.send(user);
  } catch (error) {
    res.status(404).send({ error: 'User not found' });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const user_id = req.query.user_id as string;
    const projects = await userModel.getProjects(parseInt(user_id));
    // console.log(projects);
    res.send(projects);
  } catch (error) {
    res.status(404).send({ error: 'Projects not found' });
  }
};

const getIssues = async (req: Request, res: Response) => {
  try {
    const user_id = req.query.user_id as string;
    const project_id = req.query.project_id as string;
    const issues = await userModel.getIssues(
      parseInt(user_id),
      parseInt(project_id)
    );
    res.send({ success: true, data: issues });
  } catch (error) {
    res
      .status(404)
      .send({ success: false, data: [], error: 'No issues found' });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getProjects,
  getIssues,
};
