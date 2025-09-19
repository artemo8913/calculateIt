import { eq } from "drizzle-orm";

import db, { categoriesTable } from "@/1shared/database";

type CategoryDBInsert = typeof categoriesTable.$inferInsert;

class CategoriesDBService {
    async createCategory(category: CategoryDBInsert) {
        try {
            return await db.insert(categoriesTable).values(category);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllCategories(tgId: string) {
        try {
            return await db.select().from(categoriesTable).where(eq(categoriesTable.tgId, tgId));
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getCategory(id: number) {
        try {
            return (await db.select().from(categoriesTable).where(eq(categoriesTable.id, id)))[0];
        } catch (e) {
            console.log(e);
        }
    }

    async updateCategory(id: number, category: Partial<CategoryDBInsert>) {
        try {
            return await db.update(categoriesTable).set(category).where(eq(categoriesTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }

    async deleteCategory(id: number) {
        try {
            return await db.delete(categoriesTable).where(eq(categoriesTable.id, id));
        } catch (e) {
            console.log(e);
        }
    }
}

export const categoriesDBService = new CategoriesDBService();