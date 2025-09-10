import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { accountsTable, categoriesTable, tagsTable, transactionsTable } from './model';

if (!process.env.DATABASE_URL) {
    throw new Error("ENV DATABASE_URL don't exist")
}

const client = postgres(process.env.DATABASE_URL, { prepare: false });

const db = drizzle({
    client, schema: {
        tagsTable,
        accountsTable,
        categoriesTable,
        transactionsTable
    }
});

export default db;
export { accountsTable, categoriesTable, tagsTable, transactionsTable };