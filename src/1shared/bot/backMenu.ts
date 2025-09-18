import { Conversation } from "@grammyjs/conversations";

import { BotContext } from "./types/bot.types";

export const buildBackMenu = (conversation: Conversation<BotContext, BotContext>, toMenu: string) => {
    return conversation.menu()
        .text("назад", async (ctx) => {
            await ctx.menu.nav(toMenu, { immediate: true });
            await conversation.halt();
        });
}
