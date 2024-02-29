import express from 'express';
import customerController from '../controllers/customerController';
const customerRoutes = express.Router();

customerRoutes.post('/create', customerController.createCustomer);

customerRoutes.get('/', customerController.getAllCustomers);

customerRoutes.get('/get-by-email', customerController.getCustomerByEmail);

customerRoutes.get('/:id', customerController.getCustomerById);

export default customerRoutes;
