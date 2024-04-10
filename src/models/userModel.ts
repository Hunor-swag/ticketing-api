import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database';

interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  subscribed: boolean;
  created: Date;
}

async function create(user: User): Promise<any> {
  try {
    const res = await query(
      'ticketing_schema',
      'INSERT INTO users SET firstname = ?, lastname = ?, email = ?, password = ?, subscribed=?, created=?',
      [
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.subscribed,
        user.created,
      ]
    );
    return res;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function findByEmail(email: string): Promise<any> {
  try {
    const res = (await query(
      'ticketing_schema',
      'SELECT * FROM users WHERE email = ?',
      [email]
    )) as Array<User>;

    if (!res || res.length == 0) {
      return null;
    }

    return res[0];
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
}

async function getAll(): Promise<any> {
  try {
    const res = await query('ticketing_schema', 'SELECT * FROM users', []);
    return res;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
}

async function findById(id: number): Promise<any> {
  try {
    const res = (await query(
      'ticketing_schema',
      'SELECT * FROM users WHERE id = ?',
      [id]
    )) as Array<User>;

    if (!res || res.length == 0) {
      return null;
    }

    return res[0];
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    throw error;
  }
}

async function getProjects(user_id: number) {
  try {
    const res = await query(
      'ticketing_schema',
      'SELECT project_id FROM project_users WHERE user_id = ?',
      [user_id]
    );

    if (!res || (res as RowDataPacket[]).length === 0) {
      return [];
    }

    const projectIds = (res as RowDataPacket[]).map((row) => row.project_id);

    const projectsQueryString = `SELECT * FROM projects WHERE id IN (${projectIds.join(',')});`;

    const projectsRes = await query('ticketing_schema', projectsQueryString, [
      (res as RowDataPacket[])[0].project_id,
    ]);

    return projectsRes;
  } catch (error) {
    console.error('Error retrieving projects:', error);
    throw error;
  }
}

async function getIssues(user_id: number, project_id: number) {
  try {
    // get issue ids that the user is assigned to

    const res = await query(
      'ticketing_schema',
      'SELECT * FROM issue_users WHERE user_id = ?',
      [user_id]
    );

    if (!res || (res as RowDataPacket[]).length === 0) {
      return [];
    }

    const issue_ids = (res as RowDataPacket[]).map((row) => row.issue_id);

    // get the issues that match the issue ids that the user is assigned to

    const issuesQueryString = `SELECT * FROM issues WHERE id IN (${issue_ids.join(
      ','
    )});`;

    const issuesRes = await query('ticketing_schema', issuesQueryString, [
      (res as RowDataPacket[])[0].issue_id,
    ]);

    return issuesRes;
  } catch (error) {
    console.error('Error retrieving issues:', error);
    throw error;
  }
}

export default {
  create,
  getAll,
  findByEmail,
  findById,
  getProjects,
  getIssues,
};
