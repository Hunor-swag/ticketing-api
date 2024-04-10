import { Request, Response } from 'express';
import systemModel from '../models/systemModel';
import userModel from '../models/userModel';
import { System } from '../types/typings';
import slugify from 'slugify';
import bcrypt from 'bcrypt';

const createSystem = async (req: Request, res: Response) => {
  try {
    const {
      system_name,
      firstname,
      lastname,
      email,
      password,
      confirm_password,
    } = req.body;

    console.log(
      system_name,
      firstname,
      lastname,
      email,
      password,
      confirm_password
    );

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const system = {
      name: system_name,
      slug: slugify(system_name),
      db_name: 'ticketing_' + slugify(system_name),
      created: new Date(),
    } as System;

    await systemModel.create(system);

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      subscribed: false,
      created: new Date(),
    };
    const result = await userModel.create(customer);

    res.status(200).send({
      success: true,
      data: null,
      message: 'System created successfully',
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};

const getSystems = async (req: Request, res: Response) => {
  try {
    const systems = await systemModel.getSystems();
    res.status(200).send({ success: true, data: systems, message: null });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};

const updateAllSystems = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    await systemModel.updateAll(query);

    res.status(200).send({ success: true, data: null, message: null });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};

export default { createSystem, updateAllSystems, getSystems };
