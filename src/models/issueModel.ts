import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database';
import { Issue } from '../types/typings';

async function create(issue: Issue): Promise<any> {
  try {
    console.log(issue);

    const insertIssueQuery = `
      INSERT INTO issues (project_id, user_id, name, type, description, status, created) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const insertIssueRes = await query('ticketing_schema', insertIssueQuery, [
      issue.project_id,
      issue.user_id,
      issue.name,
      issue.type,
      issue.description,
      issue.status,
      issue.created,
    ]);

    issue.users.push({ id: issue.user_id });

    issue.users.forEach(async (user) => {
      const insertIssueUserQuery = `
        INSERT INTO issue_users (user_id, issue_id) VALUES (?, ?);
      `;
      await query('ticketing_schema', insertIssueUserQuery, [
        user.id,
        (insertIssueRes as ResultSetHeader).insertId,
      ]);
    });

    return insertIssueRes;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

async function get(id: number) {
  try {
    const queryString = `
      SELECT * FROM issues WHERE id = ?;
    `;
    const res = await query('ticketing_schema', queryString, [id]);
    return (res as RowDataPacket[])[0];
  } catch (error) {
    console.error('Error getting issue by id:', error);
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

async function close(id: number) {
  try {
    const queryString = `
		UPDATE issues SET status = 'closed' WHERE id = ?;
	  `;
    const res = await query('ticketing_schema', queryString, [id]);
    return res;
  } catch (error) {
    console.error('Error closing issue:', error);
    throw error;
  }
}

async function getAll() {
  try {
    const queryString = `
	  SELECT * FROM issues;
	`;
    const res = await query('ticketing_schema', queryString, []);
    return res;
  } catch (error) {
    console.error('Error getting all issues:', error);
    throw error;
  }
}

async function addUser(issue_id: number, user_id: number) {
  try {
    const queryString = `
      INSERT INTO issue_users (user_id, issue_id) VALUES (?, ?);
    `;
    const res = await query('ticketing_schema', queryString, [
      user_id,
      issue_id,
    ]);
    return res;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

export default {
  get,
  create,
  //   update,
  getAll,
  close,
  addUser,
};
