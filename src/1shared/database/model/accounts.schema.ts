import { boolean, integer, numeric, pgTable, text } from "drizzle-orm/pg-core";

export const accountsTable = pgTable("Accounts", {
    tgId: text().notNull(),
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    value: numeric({ precision: 14, scale: 2 }).default("0"),
    isPrimary: boolean().default(false)
});
