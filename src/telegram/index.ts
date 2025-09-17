import { Bot } from "grammy";
import { conversations } from "@grammyjs/conversations";

import { BotContext } from "@/1shared/bot";
import { BOT_STARTUP_COMMANDS, BOT_START } from "@/1shared/bot/commands";
import { accountsComposer } from "@/2entities/accounts";

import { BOT_TEXT } from "./text";
import { Menu } from "@grammyjs/menu";

export function createBot(token: string) {
    const bot = new Bot<BotContext>(token);

    bot.api.setMyCommands(BOT_STARTUP_COMMANDS);

    const mainMenu = new Menu<BotContext>("main-menu")
        .submenu("Категории", "categories").row()
        .submenu("Счета", "accounts").row()
        .text("ТЕКСТ", (ctx) => ctx.reply("ТЕКСТ!")).row();


    bot.use(conversations());

    bot.use(mainMenu);
    bot.use(accountsComposer);


    bot.command(BOT_START.command, async (ctx) => {
        const message_id = ctx.message?.message_id;

        let reply_parameters;

        if (message_id) {
            reply_parameters = { message_id };
        }

        await ctx.reply("Посмотрите на это меню:", { reply_markup: mainMenu });

        await ctx.reply(BOT_TEXT.greeting + " " + `id = ${ctx.message?.chat.id}`, { reply_parameters });
    });

    return bot;
}
