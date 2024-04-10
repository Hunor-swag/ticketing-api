import express from 'express';
import systemController from '../controllers/systemController';

const systemRoutes = express.Router();

systemRoutes.post('/create', systemController.createSystem);
systemRoutes.post('/update-all', systemController.updateAllSystems);

export default systemRoutes;
