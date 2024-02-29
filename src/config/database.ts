import { createConnection, Connection } from 'mysql2/promise';

export const query = async (dbname: string, query: string, values: any[]) => {
  try {
    const connection: Connection = await createConnection({
      host: process.env.MYSQL_DATABASE_HOST || 'localhost',
      port: process.env.MYSQL_DATABASE_PORT
        ? parseInt(process.env.MYSQL_DATABASE_PORT)
        : 3300,
      user: process.env.MYSQL_DATABASE_USER || 'hunor',
      password: process.env.MYSQL_DATABASE_PASSWORD || 'Hunor1@123',
      database: dbname || 'ticketing',
    });

    const [results] = await connection.execute(query, values);
    connection.end();
    // console.log("Data successfully fetched:\n", results);
    return results;
  } catch (error) {
    console.error('Failed to fetch data from the database:\n\n\n', error);
    throw error;
  }
};
