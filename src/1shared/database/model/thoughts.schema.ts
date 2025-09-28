import { timestamp, integer, pgTable, text } from "drizzle-orm/pg-core";

export const thoughtsTable = pgTable("Thoughts", {
    tgId: text().notNull(),
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    date: timestamp().notNull().defaultNow(),
    thought: text().notNull().default(""),
    conditions: text().notNull().default(""),
    emotion: text().notNull().default(""),
    advice: text().notNull().default(""),
});
