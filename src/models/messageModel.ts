import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database';
import { Message } from '../types/typings';

async function create(msg: Message): Promise<any> {
  try {
    const insertMessageQuery = `
      INSERT INTO messages (issue_id, user_id, message, timestamp) VALUES (?, ?, ?, ?);
    `;
    const insertMessageRes = await query(
      'ticketing_schema',
      insertMessageQuery,
      [msg.issue_id, msg.user_id, msg.message, msg.timestamp]
    );

    return insertMessageRes;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}

async function get(id: number) {
  try {
    const queryString = `
      SELECT * FROM messages WHERE id = ?;
    `;
    const res = await query('ticketing_schema', queryString, [id]);
    return (res as RowDataPacket[])[0];
  } catch (error) {
    console.error('Error getting message by id:', error);
    throw error;
  }
}

// async function update(id: number, issue: Issue) {
//   try {
//     const queryString = `
//       UPDATE issues SET name = ? WHERE id = ?;
//     `;
//     const res = await query('ticketing_schema', queryString, [issue.name, id]);
//     return res;
//   } catch (error) {
//     console.error('Error updating project:', error);
//     throw error;
//   }
// }

async function getAll(issue_id: number) {
  try {
    const queryString = `
	  SELECT * FROM messages WHERE issue_id = ?;
	`;
    const res = await query('ticketing_schema', queryString, [issue_id]);
    return res;
  } catch (error) {
    console.error('Error getting all messages:', error);
    throw error;
  }
}

export default {
  get,
  create,
  //   update,
  getAll,
};
