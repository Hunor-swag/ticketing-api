import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database';

interface Customer {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

async function createCustomer(customer: Customer): Promise<any> {
  try {
    const res = await query(
      'ticketing',
      'INSERT INTO customers SET firstname = ?, lastname = ?, email = ?, password = ?',
      [customer.firstname, customer.lastname, customer.email, customer.password]
    );
    return res;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

async function findByEmail(email: string): Promise<any> {
  try {
    const res = (await query(
      'ticketing',
      'SELECT * FROM customers WHERE email = ?',
      [email]
    )) as Array<Customer>;

    console.log(res);
    if (!res || res.length == 0) {
      return null;
    }

    return res[0];
  } catch (error) {
    console.error('Error retrieving customer by email:', error);
    throw error;
  }
}

async function getAllCustomers(): Promise<any> {
  try {
    const res = await query('ticketing', 'SELECT * FROM customers', []);
    return res;
  } catch (error) {
    console.error('Error retrieving customers:', error);
    throw error;
  }
}

async function findById(id: number): Promise<any> {
  try {
    const res = (await query(
      'ticketing',
      'SELECT * FROM customers WHERE id = ?',
      [id]
    )) as Array<Customer>;

    if (!res || res.length == 0) {
      return null;
    }

    return res[0];
  } catch (error) {
    console.error('Error retrieving customer by ID:', error);
    throw error;
  }
}

export default {
  createCustomer,
  getAllCustomers,
  findByEmail,
  findById,
};
