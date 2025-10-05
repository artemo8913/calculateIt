import { eq } from "drizzle-orm";

import db, { anxietiesTable } from "@/1shared/database";

type AnxietyDBInsert = typeof anxietiesTable.$inferInsert;

class AnxietiesDBService {
    async createAnxiety(account: AnxietyDBInsert) {
        try {
            return await db.insert(anxietiesTable).values(account);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllAnxieties(tgId: string) {
        try {
            return await db.select().from(anxietiesTable).where(eq(anxietiesTable.tgId, tgId));
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getAnxiety(id: number) {
        try {
            return (await db.select().from(anxietiesTable).where(eq(anxietiesTable.id, id)))[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getRandomAnxietyId(tgId: string) {
        try {
            const ids = await db.select({ id: anxietiesTable.id }).from(anxietiesTable).where(eq(anxietiesTable.tgId, tgId));

            if (ids.length === 0) {
                return;
            }

            const choosedIndex = Math.floor(ids.length * Math.random());

            const choosedThoughtId = ids[choosedIndex].id;

            return this.getAnxiety(choosedThoughtId);
        } catch (e) {

        }
    }

    async updateAnxiety(id: number, account: Partial<AnxietyDBInsert>) {
        try {
            return await db.update(anxietiesTable).set(account).where(eq(anxietiesTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }

    async deleteAnxiety(id: number) {
        try {
            return await db.delete(anxietiesTable).where(eq(anxietiesTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }
}

export const anxietiesDBService = new AnxietiesDBService();