import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const tagsTable = pgTable("Tags", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
});
