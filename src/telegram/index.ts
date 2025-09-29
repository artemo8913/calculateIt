import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";

import { BotContext, getInitialStore } from "@/1shared/bot";
import { BOT_STARTUP_COMMANDS, BOT_START, BOT_INFO, BOT_EXPORT_DB } from "@/1shared/bot/commands";
import { thoughtsComposer, createThoughtsConversation, createAdviceConversation } from "@/2entities/thoughts";

import { BOT_TEXT } from "./text";
import { exportDatabase } from "./exportDatabase";


export function createBot(token: string) {
    const bot = new Bot<BotContext>(token);

    bot.catch((err) => {
        const ctx = err.ctx;
        console.error(`Error while handling update ${ctx.update.update_id}:`, err);

        // Отвечаем на callback query чтобы убрать "часики" на кнопке
        ctx.answerCallbackQuery().catch(() => { });
    });

    bot.use(session({ initial: getInitialStore }));
    bot.use(conversations());
    bot.use(createConversation(createThoughtsConversation));
    bot.use(createConversation(createAdviceConversation));
    bot.use(thoughtsComposer);

    bot.api.setMyCommands(BOT_STARTUP_COMMANDS, { scope: { type: "all_private_chats" } });

    bot.command([BOT_START.command, BOT_INFO.command], async (ctx) => {
        await ctx.api.setMyCommands(BOT_STARTUP_COMMANDS, { scope: { type: "all_private_chats" } });
        await ctx.reply(BOT_TEXT.greeting)
    });

    bot.command(BOT_EXPORT_DB.command, exportDatabase);

    return bot;
}
