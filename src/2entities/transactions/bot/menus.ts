import { BotContext } from "@/1shared/bot";
import { buildAccountMenu, Account } from "@/2entities/accounts/@x/transactions";

import { Menu } from "@grammyjs/menu";

function setTempAccountId(ctx: BotContext, acc: Account) {
    ctx.session.tempTransaction.accountId = acc.id;
}

function setTempTransactionType(ctx: BotContext, type: "inc" | "out") {
    ctx.session.tempTransaction.type = type;
}

function setIncomeTempTransactionType(ctx: BotContext) {
    setTempTransactionType(ctx, "inc");
}

function setOutcomeTempTransactionType(ctx: BotContext) {
    setTempTransactionType(ctx, "out");
}

const selectTransactionTypeMenu = new Menu<BotContext>("selectTransactionTypeMenu")
    .text("доход", ctx => {
        setIncomeTempTransactionType(ctx);
    }).row()
    .text("расход", ctx => {
        setOutcomeTempTransactionType(ctx);
    }).row()
    .back("назад");


const selectAccountMenu = buildAccountMenu("selectAccountMenu", (ctx, acc) => {
    setTempAccountId(ctx, acc);
    ctx.editMessageReplyMarkup({ reply_markup: selectTransactionTypeMenu });
});


async function createTransaction(ctx: BotContext) {
    await ctx.reply("Добавить транзакцию", { reply_markup: selectAccountMenu });
}

const transactionMainMenu = new Menu<BotContext>("transactionMainMenu")
    .text("Добавить транзакцию", createTransaction).row()
    .back("Назад", ctx => ctx.editMessageText("Главное меню"));

export {
    selectAccountMenu,
    transactionMainMenu,
    selectTransactionTypeMenu,
};