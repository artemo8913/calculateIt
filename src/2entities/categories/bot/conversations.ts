import { Conversation } from "@grammyjs/conversations";

import { BotContext, buildBackMenu } from "@/1shared/bot";

import { buildCategoriesMainMenuClone } from "./menus";
import { categoriesDBService } from "../model/categoriesDB.service";

export async function createCategoryConversation(conversation: Conversation<BotContext, BotContext>, ctx: BotContext) {
    const categoriesMainMenuClone = buildCategoriesMainMenuClone(conversation);

    const backMenu = buildBackMenu(conversation, "categoriesMainMenu");

    await ctx.editMessageText("Введите наименование категории:", { reply_markup: backMenu });

    const name = await conversation.form.text();

    if (!name || !ctx.from) {
        return await ctx.editMessageText(`Не верное наименование`, { reply_markup: backMenu });
    }

    await conversation.external(() => categoriesDBService.createCategory({ name, tgId: String(ctx.from!.id) }));

    await ctx.editMessageText(`Категория с наименованием ${name} создан`);

    await ctx.editMessageText("Главное меню", { reply_markup: categoriesMainMenuClone });
}
