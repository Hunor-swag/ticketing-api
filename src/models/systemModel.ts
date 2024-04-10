import { System } from '../types/typings';
import { query } from '../config/database';
import { exec } from 'child_process';
import fs from 'fs';
import { promisify } from 'util';

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

    await query(
      'ticketing_schema',
      `SELECT * FROM information_schema.tables WHERE table_schema = 'ticketing_schema' INTO OUTFILE '${dumpFilename}'`,
      []
    );

    await query(
      'ticketing_schema',
      `CREATE DATABASE IF NOT EXISTS ${system.db_name}`,
      []
    );

    const sql = fs.readFileSync(dumpFilename, 'utf-8');
    await query(system.db_name, sql, []);

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
