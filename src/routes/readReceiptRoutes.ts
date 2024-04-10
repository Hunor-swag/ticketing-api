import express from 'express';
import readReceiptController from '../controllers/readReceiptController';

const readReceiptRoutes = express.Router();

readReceiptRoutes.post('/create', readReceiptController.createReadReceipt);
readReceiptRoutes.get(
  '/get/:issue_id',
  readReceiptController.getReadReceiptsForIssue
);
readReceiptRoutes.get('/get-all', readReceiptController.getReadReceipts);

export default readReceiptRoutes;
