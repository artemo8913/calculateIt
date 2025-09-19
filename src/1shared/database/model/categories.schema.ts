import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("Categories", {
    tgId: text().notNull(),
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
});
