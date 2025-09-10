import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("Categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
});
