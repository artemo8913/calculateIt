import { eq } from "drizzle-orm";

import db, { thanksTable } from "@/1shared/database";

type ThankDBInsert = typeof thanksTable.$inferInsert;

class ThankssDBService {
    async createThank(account: ThankDBInsert) {
        try {
            return await db.insert(thanksTable).values(account);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllThanks(tgId: string) {
        try {
            return await db.select().from(thanksTable).where(eq(thanksTable.tgId, tgId));
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getThank(id: number) {
        try {
            return (await db.select().from(thanksTable).where(eq(thanksTable.id, id)))[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getRandomThankId(tgId: string) {
        try {
            const ids = await db.select({ id: thanksTable.id }).from(thanksTable).where(eq(thanksTable.tgId, tgId));

            if (ids.length === 0) {
                return;
            }

            const choosedIndex = Math.floor(ids.length * Math.random());

            const choosedThankId = ids[choosedIndex].id;

            return this.getThank(choosedThankId);
        } catch (e) {

        }
    }

    async updateThank(id: number, account: Partial<ThankDBInsert>) {
        try {
            return await db.update(thanksTable).set(account).where(eq(thanksTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }

    async deleteThank(id: number) {
        try {
            return await db.delete(thanksTable).where(eq(thanksTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }
}

export const thanksDBService = new ThankssDBService();