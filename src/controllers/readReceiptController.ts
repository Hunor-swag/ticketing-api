import { Request, Response } from 'express';
import readReceiptModel from '../models/readReceiptModel';
import { ReadReceipt } from '../types/typings';

const createReadReceipt = async (req: Request, res: Response) => {
  try {
    const { project_id, issue_id, message_id, user_id, timestamp } = req.body;

    const readReceipts =
      await readReceiptModel.getReadReceiptsForIssue(issue_id);

    if (
      readReceipts.some(
        (readReceipt) =>
          readReceipt.user_id === user_id &&
          readReceipt.message_id === message_id
      )
    ) {
      return res.status(200).send({
        success: true,
        data: null,
        message: 'Read receipt already exists',
      });
    }

    const readReceipt = {
      project_id,
      issue_id,
      message_id,
      user_id,
      timestamp,
    } as ReadReceipt;

    const json = await readReceiptModel.create(readReceipt);

    res.status(200).send({
      success: true,
      data: json,
      message: 'Read receipt created successfully',
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};

const getReadReceipts = async (req: Request, res: Response) => {
  try {
    const readReceipts = await readReceiptModel.getReadReceipts();

    res.status(200).send({
      success: true,
      data: readReceipts,
      message: 'Read receipts retrieved successfully',
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};

const getReadReceiptsForIssue = async (req: Request, res: Response) => {
  try {
    const { issue_id } = req.params;

    const readReceipts = await readReceiptModel.getReadReceiptsForIssue(
      parseInt(issue_id)
    );

    res.status(200).send({
      success: true,
      data: readReceipts,
      message: 'Read receipts retrieved successfully',
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};

export default { createReadReceipt, getReadReceipts, getReadReceiptsForIssue };
