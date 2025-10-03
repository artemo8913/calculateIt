import { timestamp, integer, pgTable, text } from "drizzle-orm/pg-core";

export const anxietiesTable = pgTable("Anxieties", {
    tgId: text().notNull(),
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    date: timestamp().notNull().defaultNow(),
    anxiety: text().notNull().default(""),
    probability: integer().notNull().default(5),
    worstConsequence: text().notNull().default(""),
    preventionActions: text().notNull().default(""),
    advice: text().notNull().default(""),
});
