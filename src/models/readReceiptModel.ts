import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database';
import { ReadReceipt } from '../types/typings';

async function create(readReceipt: ReadReceipt): Promise<ResultSetHeader> {
  try {
    const { project_id, user_id, issue_id, message_id } = readReceipt;
    const timestamp = new Date();
    const insertQuery =
      'INSERT INTO read_receipts (project_id, user_id, issue_id, message_id, timestamp) VALUES (?, ?, ?, ?, ?)';
    const res = await query('ticketing_schema', insertQuery, [
      project_id,
      user_id,
      issue_id,
      message_id,
      timestamp,
    ]);
    return res as ResultSetHeader;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getReadReceipts(): Promise<RowDataPacket[]> {
  try {
    const selectQuery = 'SELECT * FROM read_receipts';
    const res = await query('ticketing_schema', selectQuery, []);
    return res as RowDataPacket[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getReadReceiptsForIssue(
  issue_id: number
): Promise<RowDataPacket[]> {
  try {
    const selectQuery = `
      SELECT u.firstname, u.lastname, rr.id, rr.project_id, rr.issue_id, rr.message_id, rr.user_id, rr.timestamp 
      FROM read_receipts rr
      JOIN users u on rr.user_id = u.id 
      WHERE issue_id = ?;
    `;
    const res = await query('ticketing_schema', selectQuery, [issue_id]);
    return res as RowDataPacket[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default { create, getReadReceipts, getReadReceiptsForIssue };
