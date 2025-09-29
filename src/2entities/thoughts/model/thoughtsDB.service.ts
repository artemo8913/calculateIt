import { eq } from "drizzle-orm";

import db, { thoughtsTable } from "@/1shared/database";

type ThoughtDBInsert = typeof thoughtsTable.$inferInsert;

class ThoughtsDBService {
    async createThought(account: ThoughtDBInsert) {
        try {
            return await db.insert(thoughtsTable).values(account);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllThoughts(tgId: string) {
        try {
            return await db.select().from(thoughtsTable).where(eq(thoughtsTable.tgId, tgId));
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getThought(id: number) {
        try {
            return (await db.select().from(thoughtsTable).where(eq(thoughtsTable.id, id)))[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getRandomThoughtId(tgId: string) {
        try {
            const ids = await db.select({ id: thoughtsTable.id }).from(thoughtsTable).where(eq(thoughtsTable.tgId, tgId));

            if (ids.length === 0) {
                return;
            }

            const choosedIndex = Math.floor(ids.length * Math.random());

            const choosedThoughtId = ids[choosedIndex].id;

            return this.getThought(choosedThoughtId);
        } catch (e) {

        }
    }

    async updateThought(id: number, account: Partial<ThoughtDBInsert>) {
        try {
            return await db.update(thoughtsTable).set(account).where(eq(thoughtsTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }

    async deleteThought(id: number) {
        try {
            return await db.delete(thoughtsTable).where(eq(thoughtsTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }
}

export const thoughtsDBService = new ThoughtsDBService();