import { System } from '../types/typings';
import { query } from '../config/database';

async function create(system: System): Promise<any> {
  try {
    const res = await query(
      'ticketing_control_panel',
      'INSERT INTO systems SET name = ?, slug = ?, db_name = ?, description = ?, created = ?',
      [
        system.name,
        system.slug,
        system.db_name,
        system.description,
        system.created,
      ]
    );
    return res;
  } catch (error) {
    console.error('Error creating system:', error);
    throw error;
  }
}

export { create };
