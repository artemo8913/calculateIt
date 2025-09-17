import { Conversation } from "@grammyjs/conversations";

import { BotContext } from "@/1shared/bot";

import { accountsDBService } from "../model/accountsDB.service";

export async function createAccount(conversation: Conversation<BotContext, BotContext>, ctx: BotContext) {
    await ctx.reply("Введите наименование счета:");

    const { from, message } = await conversation.waitFor("message:text");

    if (!message.text) {
        return await ctx.reply(`Не верное наименование`);
    }

    await conversation.external(() => accountsDBService.createAccount({ name: message.text, tgId: String(from.id) }));
    await ctx.editMessageText(`Счет с наименование ${message.text} создан`);
    await ctx.deleteMessage();
}
