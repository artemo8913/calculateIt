import { Menu } from "@grammyjs/menu";

import { BotContext } from "@/1shared/bot";
import { buildAccountMenu } from "@/2entities/accounts/@x/transactions";
import { buildCategoriesMenu } from "@/2entities/categories/bot/menus";

function setTempCategory(ctx: BotContext, id: number) {
    ctx.session.tempTransaction.categoryId = id;

}

function setTempAccountId(ctx: BotContext, id: number) {
    ctx.session.tempTransaction.accountId = id;
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

const transactionMainMenu = new Menu<BotContext>("transactionMainMenu")
    .text("Добавить транзакцию", createTransaction).row()
    .back("Назад", ctx => ctx.editMessageText("Главное меню"));

async function createTransaction(ctx: BotContext) {
    await ctx.reply("Добавить транзакцию", { reply_markup: selectAccountMenu });
}

const selectAccountMenu = buildAccountMenu("selectAccountMenu", (ctx, acc) => {
    setTempAccountId(ctx, acc.id);
    ctx.editMessageReplyMarkup({ reply_markup: selectTransactionTypeMenu });
});

const selectTransactionTypeMenu = new Menu<BotContext>("selectTransactionTypeMenu")
    .text("доход", ctx => {
        setIncomeTempTransactionType(ctx);
        ctx.editMessageReplyMarkup({ reply_markup: selectCategoryMenu });
    }).row()
    .text("расход", ctx => {
        setOutcomeTempTransactionType(ctx);
        ctx.editMessageReplyMarkup({ reply_markup: selectCategoryMenu });
    }).row()
    .back("назад");

const selectCategoryMenu = buildCategoriesMenu("selectCategoryMenu", (ctx, category) => {
    setTempCategory(ctx, category.id);
});

export {
    transactionMainMenu,
    selectAccountMenu,
    selectTransactionTypeMenu,
    selectCategoryMenu,
};