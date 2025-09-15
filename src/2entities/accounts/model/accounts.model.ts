import { eq } from "drizzle-orm";

import db, { accountsTable } from "@/1shared/database";

class AccountDBService {
    async createAccount(account: typeof accountsTable.$inferInsert) {
        try {
            return await db.insert(accountsTable).values(account);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllAccounts(tgId: string) {
        try {
            return await db.select().from(accountsTable).where(eq(accountsTable.tgId, tgId));
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getAccount(id: number) {
        try {
            return (await db.select().from(accountsTable).where(eq(accountsTable.id, id)))[0];
        } catch (e) {
            console.log(e);
        }
    }

    async updateAccount(id: number, account: Partial<typeof accountsTable.$inferInsert>) {
        try {
            return await db.update(accountsTable).set(account).where(eq(accountsTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }

    async deleteAccount(id: number) {
        try {
            return await db.delete(accountsTable).where(eq(accountsTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }
}

export const accountDBService = new AccountDBService();