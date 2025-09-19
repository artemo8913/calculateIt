import { Menu, MenuRange, MenuFlavor } from "@grammyjs/menu";
import { Conversation } from "@grammyjs/conversations";

import { BotContext } from "@/1shared/bot";

import { Category } from "../model/categories.types";
import { categoriesDBService } from "../model/categoriesDB.service";

function buildCategoriesMenu(name: string, callback: (ctx: BotContext & MenuFlavor, category: Category) => Promise<unknown> | unknown) {
    return new Menu<BotContext>(name)
        .dynamic(async (ctx) => {
            const range = new MenuRange<BotContext>();

            const categories = await categoriesDBService.getAllCategories(String(ctx.from?.id));

            categories.forEach(category => range.text(`${category.name}`, async (ctx) => await callback(ctx, category)).row());
            return range;
        })
        .back("Назад");
};

const categoriesMainMenu = new Menu<BotContext>("categoriesMainMenu")
    .submenu("Посмотреть все", "selectCategoriesMenu").row()
    .submenu("Удалить категорию", "deleteCategoryMenu").row()
    .text("Добавить категорию", (ctx) => ctx.conversation.enter("createCategoryConversation")).row()
    .back("Назад");

const buildCategoriesMainMenuClone = (conversation: Conversation<BotContext, BotContext>) => {
    return conversation.menu("categoriesMainMenu")
        .text("Посмотреть все").row()
        .text("Удалить категорию").row()
        .text("Добавить категорию").row()
        .back("Назад");
}

const selectCategoriesMenu = buildCategoriesMenu("selectCategoriesMenu", (ctx) => {
    ctx.menu.update();
});

const deleteCategoryMenu = buildCategoriesMenu("deleteCategoryMenu", async (ctx, acc) => {
    await categoriesDBService.deleteCategory(acc.id);
    ctx.menu.update();
});

export {
    categoriesMainMenu,
    deleteCategoryMenu,
    selectCategoriesMenu,
    buildCategoriesMenu,
    buildCategoriesMainMenuClone
};