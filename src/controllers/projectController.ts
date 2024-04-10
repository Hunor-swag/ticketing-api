import express, { Request, Response } from 'express';
import projectModel from '../models/projectModel';

const createProject = async (req: Request, res: Response) => {
  try {
    const { name, user_id, description } = req.body;
    const created = new Date();

    const project = await projectModel.create({
      name,
      description,
      user_id,
      created: created,
    });

    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create project' });
  }
};

const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await projectModel.get(parseInt(id as string));
    if (!project) return res.status(404).send({ error: 'Project not found' });
    res.send(project);
  } catch (error) {
    res.status(500).send({ error: 'Failed to get project' });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const project_id = req.query.project_id as string;

    const projectUsers = await projectModel.getUsers(parseInt(project_id));

    // console.log('Project users: ', projectUsers);

    res.status(200).send(projectUsers);
  } catch (error) {
    res.status(500).send({ error: 'Failed to get project users' });
  }
};

const getIssues = async (req: Request, res: Response) => {
  try {
    const project_id = req.query.project_id as string;

    const projectIssues = await projectModel.getIssues(parseInt(project_id));

    res.status(200).send(projectIssues);
  } catch (error) {
    res.status(500).send({ error: 'Failed to get project issues' });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { project_id, user_id } = req.body;
    const projectUser = await projectModel.addUser(
      parseInt(project_id),
      parseInt(user_id)
    );

    res.status(200).send({ success: true, data: projectUser });
  } catch (error) {
    console.log(error);
    if (error === 'User already in project') {
      res
        .status(400)
        .send({ success: false, error: 'User already in project' });
    } else
      res
        .status(500)
        .send({ success: false, error: 'Failed to add user to project' });
  }
};

export default { createProject, getUsers, getProject, getIssues, addUser };
