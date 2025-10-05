import { Composer } from "grammy";

import { BotContext } from "@/1shared/bot";
import { BOT_CREATE_THANK } from "@/1shared/bot/commands";

import { createThankConversation } from "./conversations";


const thankComposer = new Composer<BotContext>();

thankComposer.command(BOT_CREATE_THANK.command, async (ctx) => {
    await ctx.conversation.enter(createThankConversation.name);
});

export { thankComposer };