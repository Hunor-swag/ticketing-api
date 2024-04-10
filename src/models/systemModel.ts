import { System } from '../types/typings';
import { query } from '../config/database';
import { exec } from 'child_process';
import fs from 'fs';
import { promisify } from 'util';
import { RowDataPacket } from 'mysql2';

const execAsync = promisify(exec);

async function create(system: System): Promise<any> {
  try {
    console.log(system);
    await query(
      'ticketing_controlpanel',
      'INSERT INTO systems SET name = ?, slug = ?, db_name = ?, description = ?, created = ?',
      [
        system.name,
        system.slug,
        system.db_name,
        system.description || null,
        system.created,
      ]
    );

    const dumpFilename = 'dump.sql';
    await execAsync(
      `mysqldump --routines -u [username] -p[password] ticketing_schema > ${dumpFilename}`
    );

    // Create the destination database
    await query('', `CREATE DATABASE IF NOT EXISTS ${system.db_name}`, []);

    // Read the dumped SQL file
    const sql = fs.readFileSync(dumpFilename, 'utf8');

    // Import the dumped SQL file into the destination database
    await query(system.db_name, sql, []);

    // Clean up the dumped SQL file
    fs.unlinkSync(dumpFilename);

    console.log('Database created successfully');
  } catch (error) {
    console.error('Error creating system:', error);
    throw error;
  }
}

async function getSystems(): Promise<any> {
  try {
    const res = await query(
      'ticketing_controlpanel',
      'SELECT * FROM systems',
      []
    );
    return res;
  } catch (error) {
    console.error('Error getting systems:', error);
    throw error;
  }
}

async function updateAll(queryString: string): Promise<any> {
  try {
    const systems = await getSystems();

    const databases = systems.map((system: System) => system.db_name);

    for (const db of databases) {
      await query(db, queryString, []);
    }

    return 'All systems updated successfully';
  } catch (error) {
    console.error('Error updating all systems:', error);
    throw error;
  }
}

export default { create, updateAll, getSystems };
