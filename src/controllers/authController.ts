import express, { Request, Response } from 'express';
import customerModel from '../models/customerModel';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const customerSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const customer = await customerModel.findByEmail(email);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const passwordValid = await bcrypt.compare(password, customer.password);

    if (!passwordValid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '30d',
    });
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
};

const customerSignUp = async (req: Request, res: Response) => {
  try {
    const { email, password, repeat_password, firstname, lastname } = req.body;
    console.log(email, password, repeat_password, firstname, lastname);

    if (password !== repeat_password) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };
    const result = await customerModel.createCustomer(customer);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to sign up' });
  }
};

export default {
  customerSignIn,
  customerSignUp,
};
