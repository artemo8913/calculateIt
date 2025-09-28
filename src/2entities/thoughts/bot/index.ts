import { Composer } from "grammy";

import { BotContext } from "@/1shared/bot";
import { BOT_CREATE_ADVICE, BOT_CREATE_THOUGHT } from "@/1shared/bot/commands";

import { createThoughtsConversation, createAdviceConversation } from "./conversations";


const thoughtsComposer = new Composer<BotContext>();

thoughtsComposer.command(BOT_CREATE_THOUGHT.command, async (ctx) => {
    await ctx.conversation.enter(createThoughtsConversation.name);
});

thoughtsComposer.command(BOT_CREATE_ADVICE.command, async (ctx) => {
    await ctx.conversation.enter(createAdviceConversation.name);
});

export { thoughtsComposer };