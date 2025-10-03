import { Conversation } from "@grammyjs/conversations";

import { BotContext, buildCancelMenu } from "@/1shared/bot";

import { thanksDBService } from "../model/thanksDB.service";

export async function createThankConversation(conversation: Conversation<BotContext, BotContext>, ctx: BotContext) {
    if (!ctx.from?.id) {
        throw new Error("Error while create thought");
    }

    const backMenu = buildCancelMenu(conversation);

    await ctx.reply("Что хорошего произошло? За что ты благодарен?", { reply_markup: backMenu });
    const thank = await conversation.form.text();

    await conversation.external(() => thanksDBService.createThank({ tgId: String(ctx.from!.id), thank }));

    await ctx.reply(`Благодарность: ${thank}`);
}
