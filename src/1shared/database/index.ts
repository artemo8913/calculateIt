import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { accountsTable } from './model/accounts.schema';
import { categoriesTable } from './model/categories.schema';
import { tagsTable } from './model/tags.schema';
import { transactionsTable } from './model/transactions.schema';

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