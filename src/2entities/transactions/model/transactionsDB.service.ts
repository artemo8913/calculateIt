import { and, eq, lte, gte, SQL } from "drizzle-orm";

import db, { transactionsTable } from "@/1shared/database";

type TransactionsDBInsert = typeof transactionsTable.$inferInsert;

class TransactionsDBService {
    async createTransaction(transaction: TransactionsDBInsert) {
        try {
            return await db.insert(transactionsTable).values(transaction);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllTransactions(tgId: string, dateStart?: string, dateEnd?: string) {
        try {
            const filter: SQL[] = [];

            filter.push(eq(transactionsTable.tgId, tgId));

            if (dateStart) {
                filter.push(gte(transactionsTable.date, dateStart))
            }

            if (dateEnd) {
                filter.push(lte(transactionsTable.date, dateEnd))
            }

            return await db.select().from(transactionsTable).where(and(...filter));
        } catch (e) {
            console.log(e);
        }
    }

    async getTransaction(id: number) {
        try {
            return (await db.select().from(transactionsTable).where(eq(transactionsTable.id, id)))[0];
        } catch (e) {
            console.log(e);
        }
    }

    async updateTransaction(id: number, transaction: Partial<TransactionsDBInsert>) {
        try {
            return await db.update(transactionsTable).set(transaction).where(eq(transactionsTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }

    async deleteTransaction(id: number) {
        try {
            return await db.delete(transactionsTable).where(eq(transactionsTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }
}

export const transactionsDBService = new TransactionsDBService();