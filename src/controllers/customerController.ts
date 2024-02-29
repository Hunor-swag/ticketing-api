import express, { Request, Response } from 'express';
import customerModel from '../models/customerModel';

const createCustomer = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    console.log(firstname, lastname, email, password);

    const customer = await customerModel.createCustomer({
      firstname,
      lastname,
      email,
      password,
    });
    console.log(customer);
    res.send(customer);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create customer' });
  }
};

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerModel.getAllCustomers();
    res.send(customers);
  } catch (error) {
    res.status(404).send({ error: 'Customers not found' });
  }
};

const getCustomerByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const customer = await customerModel.findByEmail(email);
    res.send(customer);
  } catch (error) {
    res.status(404).send({ error: 'Customer not found' });
  }
};

const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const customer = await customerModel.findById(parseInt(id));
    res.send(customer);
  } catch (error) {
    res.status(404).send({ error: 'Customer not found' });
  }
};

export default {
  createCustomer,
  getAllCustomers,
  getCustomerByEmail,
  getCustomerById,
};
