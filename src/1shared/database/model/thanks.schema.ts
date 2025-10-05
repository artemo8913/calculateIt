import { timestamp, integer, pgTable, text } from "drizzle-orm/pg-core";

export const thanksTable = pgTable("Thanks", {
    tgId: text().notNull(),
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    date: timestamp().notNull().defaultNow(),
    thank: text().notNull().default(""),
});
