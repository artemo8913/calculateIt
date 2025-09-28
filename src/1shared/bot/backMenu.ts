import { Conversation } from "@grammyjs/conversations";

import { BotContext } from "./bot.types";

export const buildCancelMenu = (conversation: Conversation<BotContext, BotContext>) => {
    return conversation.menu()
        .text("отмена", async (ctx) => {
            await ctx.deleteMessage();
            await conversation.halt();
        });
}
