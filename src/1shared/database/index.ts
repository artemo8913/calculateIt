import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { thoughtsTable } from './model/thoughts.schema';

if (!process.env.DATABASE_URL) {
    throw new Error("ENV DATABASE_URL don't exist")
}

const client = postgres(process.env.DATABASE_URL, { prepare: false });

const db = drizzle({
    client, schema: {
        thoughtsTable
    }
});

export default db;
export { thoughtsTable };