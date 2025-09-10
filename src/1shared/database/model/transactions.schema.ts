import { integer, numeric, pgTable, text, pgEnum } from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts.schema";
import { categoriesTable } from "./categories.schema";
import { tagsTable } from "./tags.schema";

// export для enum необходим, чтобы при генерации sql drizzle добавил команду на создание enum
export const transactionTypeEnum = pgEnum("transactionenum", ["inc", "out"]);

export const transactionsTable = pgTable("Transactions", {
    tgId: text().notNull(),
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    accountId: integer().references(() => accountsTable.id).notNull(),
    categoryId: integer().references(() => categoriesTable.id).notNull(),
    tagIds: integer().references(() => tagsTable.id).array().notNull(),
    type: transactionTypeEnum().notNull(),
    note: text(),
    value: numeric({ precision: 14, scale: 2 }).notNull(),
});
