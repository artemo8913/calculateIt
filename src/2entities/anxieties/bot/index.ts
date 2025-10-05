import { Composer } from "grammy";

import { BotContext } from "@/1shared/bot";
import { BOT_CREATE_ANXIETY } from "@/1shared/bot/commands";

import { createAnxietyConversation } from "./conversations";


const anxietiesComposer = new Composer<BotContext>();

anxietiesComposer.command(BOT_CREATE_ANXIETY.command, async (ctx) => {
    await ctx.conversation.enter(createAnxietyConversation.name);
});

export { anxietiesComposer };