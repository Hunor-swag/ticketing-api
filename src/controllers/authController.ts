import express, { Request, Response } from 'express';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const customer = await userModel.findByEmail(email);
    if (!customer) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordValid = await bcrypt.compare(password, customer.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: customer.id,
        email: customer.email,
        firstname: customer.firstname,
        lastname: customer.lastname,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '30d',
      }
    );
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to sign in: ' + error });
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, confirm_password, firstname, lastname } = req.body;
    console.log(email, password, confirm_password, firstname, lastname);

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const created = new Date();

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      subscribed: false,
      created,
    };
    const result = await userModel.create(customer);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to sign up' });
  }
};

const verifyToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token not provided' });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ authenticated: false });
        }
        return res.status(200).json({ authenticated: true, decoded });
      }
    );
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: 'Failed to verify token: ' + err.message });
  }
};

export default {
  signIn,
  signUp,
  verifyToken,
};
