import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { thanksTable } from './model/thanks.schema';
import { thoughtsTable } from './model/thoughts.schema';
import { anxietiesTable } from './model/anxieties.schema';

if (!process.env.DATABASE_URL) {
    throw new Error("ENV DATABASE_URL don't exist")
}

const client = postgres(process.env.DATABASE_URL, { prepare: false });

const db = drizzle({
    client, schema: {
        thanksTable,
        thoughtsTable,
        anxietiesTable,
    }
});

export default db;
export { thanksTable, thoughtsTable, anxietiesTable };