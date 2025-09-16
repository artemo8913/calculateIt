import { accountsTable } from "@/1shared/database";

export type Account = typeof accountsTable.$inferSelect;