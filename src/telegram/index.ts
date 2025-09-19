import { Bot, session } from "grammy";
import { Menu } from "@grammyjs/menu";
import { conversations, createConversation } from "@grammyjs/conversations";

import { BotContext, getInitialStore } from "@/1shared/bot";
import { BOT_STARTUP_COMMANDS, BOT_START } from "@/1shared/bot/commands";
import { accountsComposer, accountsMainMenu, createAccountConversation } from "@/2entities/accounts";
import { transactionComposer, transactionMainMenu } from "@/2entities/transactions";
import { categoriesComposer, categoriesMainMenu, createCategoryConversation } from "@/2entities/categories";


export function createBot(token: string) {
    const bot = new Bot<BotContext>(token);

    bot.catch((err) => {
        const ctx = err.ctx;
        console.error(`Error while handling update ${ctx.update.update_id}:`, err);

        // Отвечаем на callback query чтобы убрать "часики" на кнопке
        ctx.answerCallbackQuery().catch(() => { });
    });

    bot.api.setMyCommands(BOT_STARTUP_COMMANDS);

    const mainMenu = new Menu<BotContext>("mainMenu")
        .submenu("Категории", "categoriesMainMenu").row()
        .submenu("Счета", "accountsMainMenu").row()
        .text("ТЕКСТ", (ctx) => ctx.reply("ТЕКСТ!")).row();

    // Порядок подключения важен
    mainMenu.register(accountsMainMenu);
    mainMenu.register(categoriesMainMenu);
    mainMenu.register(transactionMainMenu);

    bot.use(session({ initial: getInitialStore }));
    bot.use(conversations());
    bot.use(createConversation(createAccountConversation));
    bot.use(createConversation(createCategoryConversation));
    bot.use(accountsComposer);
    bot.use(categoriesComposer);
    bot.use(transactionComposer);
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
