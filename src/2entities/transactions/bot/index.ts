import { Composer } from "grammy";

import { BotContext } from "@/1shared/bot";

import { transactionMainMenu, selectAccountMenu, selectTransactionTypeMenu, selectCategoryMenu } from "./menus";

const transactionComposer = new Composer<BotContext>();

transactionMainMenu.register(selectAccountMenu);
transactionMainMenu.register(selectCategoryMenu);
transactionMainMenu.register(selectTransactionTypeMenu);
transactionComposer.use(transactionMainMenu);

transactionComposer.on("message:text", async (ctx, next) => {
    const { msg } = ctx;
    const value = Number(msg.text);
    const isNumber = !isNaN(value);

    if (isNumber) {
        ctx.session.tempTransaction.value = value.toString();
        await ctx.reply("Добавить транзакцию", { reply_markup: selectAccountMenu })
    } else {
        return next();
    }
});

export { transactionComposer, transactionMainMenu };