import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";
import { defineConfig } from 'drizzle-kit';

loadEnvConfig(cwd());

if (!process.env.DATABASE_URL) {
    throw new Error('ENV DATABASE_URL do not exist')
}


export default defineConfig({
    out: './drizzle',
    schema: './src/1shared/database/model/*.schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
