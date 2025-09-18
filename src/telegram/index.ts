import { Bot } from "grammy";
import { Menu } from "@grammyjs/menu";
import { conversations } from "@grammyjs/conversations";

import { BotContext } from "@/1shared/bot";
import { BOT_STARTUP_COMMANDS, BOT_START } from "@/1shared/bot/commands";
import { accountsComposer, accountsMainMenu } from "@/2entities/accounts";


export function createBot(token: string) {
    const bot = new Bot<BotContext>(token);
    bot.api.setMyCommands(BOT_STARTUP_COMMANDS);

    const mainMenu = new Menu<BotContext>("main-menu")
        .submenu("Категории", "categories").row()
        .submenu("Счета", "accountsMainMenu").row()
        .text("ТЕКСТ", (ctx) => ctx.reply("ТЕКСТ!")).row();

    // Порядок подключения важен
    mainMenu.register(accountsMainMenu);

    bot.use(conversations());
    bot.use(accountsComposer);


    bot.use(mainMenu);


    bot.command(BOT_START.command, async (ctx) => {
        const message_id = ctx.message?.message_id;

        let reply_parameters;

        if (message_id) {
            reply_parameters = { message_id };
        }

        await ctx.reply("Главное меню", { reply_markup: mainMenu });
    });

    return bot;
}
