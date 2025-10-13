import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// const pool = new Pool({
//     connectionString: process.env.DB_URL,
// });

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // Exit the process or handle the error appropriately
});

export const db = drizzle({ client: pool });


