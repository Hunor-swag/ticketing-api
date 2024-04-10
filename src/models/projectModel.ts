import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database';
import { Project } from '../types/typings';

async function create(project: Project): Promise<any> {
  try {
    const insertProjectQuery = `
      INSERT INTO projects (name, user_id, description, created) VALUES (?, ?, ?, ?);
    `;
    const insertProjectRes = await query(
      'ticketing_schema',
      insertProjectQuery,
      [project.name, project.user_id, project.description, project.created]
    );

    const insertProjectUserQuery = `
      INSERT INTO project_users (project_id, user_id) VALUES (?, ?);
    `;

    const insertProjectUserRes = await query(
      'ticketing_schema',
      insertProjectUserQuery,
      [(insertProjectRes as ResultSetHeader).insertId, project.user_id]
    );

    return [
      insertProjectRes,
      // getProjectIdRes,
      insertProjectUserRes,
    ];
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

async function get(id: number) {
  try {
    const queryString = `
      SELECT * FROM projects WHERE id = ?;
    `;
    const res = await query('ticketing_schema', queryString, [id]);
    if ((res as RowDataPacket[]).length === 0) return null;
    return (res as RowDataPacket[])[0];
  } catch (error) {
    console.error('Error getting project by id:', error);
    throw error;
  }
}

async function update(id: number, project: Project) {
  try {
    const queryString = `
      UPDATE projects SET name = ? WHERE id = ?;
    `;
    const res = await query('ticketing_schema', queryString, [
      project.name,
      id,
    ]);
    return res;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

async function getUsers(project_id: number) {
  try {
    const queryString = `
      SELECT * FROM project_users WHERE project_id = ?;
    `;
    const res = await query('ticketing_schema', queryString, [project_id]);

    if (
      (res as RowDataPacket[]) === undefined ||
      (res as RowDataPacket[]).length === 0
    )
      return null;

    const userIds = (res as RowDataPacket[]).map((row) => row.user_id);

    const usersQueryString = `
      SELECT * FROM users WHERE id IN (${userIds.join(',')});
    `;

    const usersRes = await query('ticketing_schema', usersQueryString, [
      (res as RowDataPacket[])[0].user_id,
    ]);

    return usersRes;
  } catch (error) {
    console.error('Error getting project users:', error);
    throw error;
  }
}

async function getIssues(project_id: number) {
  try {
    const queryString = `
      SELECT * FROM issues WHERE project_id = ?;
    `;
    const res = await query('ticketing_schema', queryString, [project_id]);

    return res;
  } catch (error) {
    console.error('Error getting project issues:', error);
    throw error;
  }
}

async function addUser(project_id: number, user_id: number) {
  try {
    // check if user is already in project
    const checkQueryString = `
      SELECT * FROM project_users WHERE project_id = ? AND user_id = ?;
    `;
    const checkRes = await query('ticketing_schema', checkQueryString, [
      project_id,
      user_id,
    ]);

    if ((checkRes as RowDataPacket[]).length > 0)
      throw 'User already in project';

    const queryString = `
      INSERT INTO project_users(project_id, user_id) VALUES (?, ?);`;

    const res = await query('ticketing_schema', queryString, [
      project_id,
      user_id,
    ]);

    return res;
  } catch (error) {
    // console.log('Error adding user to project:', error);
    throw error;
  }
}

export default {
  get,
  create,
  update,
  getUsers,
  getIssues,
  addUser,
};
