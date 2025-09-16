import { transactionsTable } from "@/1shared/database";

export type Transaction = typeof transactionsTable.$inferInsert;