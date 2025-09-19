import { Conversation } from "@grammyjs/conversations";

import { BotContext, buildBackMenu } from "@/1shared/bot";

import { accountsDBService } from "../model/accountsDB.service";
import { buildAccountsMainMenuClone } from "./menus";

export async function createAccountConversation(conversation: Conversation<BotContext, BotContext>, ctx: BotContext) {
    const accountsMainMenuClone = buildAccountsMainMenuClone(conversation);

    const backMenu = buildBackMenu(conversation, "accountsMainMenu");

    await ctx.editMessageText("Введите наименование счета:", { reply_markup: backMenu });

    const name = await conversation.form.text();

    if (!name || !ctx.from) {
        return await ctx.editMessageText(`Не верное наименование`, { reply_markup: backMenu });
    }

    await conversation.external(() => accountsDBService.createAccount({ name, tgId: String(ctx.from!.id) }));

    await ctx.editMessageText(`Счет с наименованием ${name} создан`);

    await ctx.editMessageText("Главное меню", { reply_markup: accountsMainMenuClone });
}
