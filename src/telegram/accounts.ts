import { Composer, Context } from "grammy";
import { Menu, MenuRange } from "@grammyjs/menu";
import { Conversation, ConversationFlavor, createConversation } from "@grammyjs/conversations";

import { Account, accountDBService } from "@/2entities/accounts";

import { BOT_CREATE_ACCOUNT, BOT_DELETE_ACCOUNT, BOT_GET_ACCOUNTS } from "./commands";
import { BotContext } from "./types/bot.types";

export const accounts = new Composer<ConversationFlavor<Context>>();

async function createAccount(conversation: Conversation, ctx: Context) {
    await ctx.reply("Введите наименование счета:");

    const { from, message } = await conversation.waitFor("message:text");

    if (!message.text) {
        return await ctx.reply(`Не верное наименование`);
    }

    await conversation.external(() => accountDBService.createAccount({ name: message.text, tgId: String(from.id) }));
    await ctx.reply(`Счет с наименование ${message.text} создан`);
    await ctx.deleteMessage();
}

accounts.use(createConversation(createAccount));
accounts.command(BOT_CREATE_ACCOUNT.command, async (ctx) => ctx.conversation.enter("createAccount"));

function buildAccountMenu(name: string, callback: (acc: Account) => Promise<unknown> | unknown) {
    return new Menu<BotContext>(name)
        .dynamic(async (ctx) => {
            const range = new MenuRange<BotContext>();
            const accounts = await accountDBService.getAllAccounts(String(ctx.from?.id));
            accounts.forEach(acc => range.text(`${acc.name} ${acc.value}Р`, () => callback(acc)).row());
            return range;
        })
        .back("Назад");
};

const selectAccountMenu = buildAccountMenu("account-menu-select", () => { });
const deleteAccountMenu = buildAccountMenu("account-menu-delete", async (acc) => await accountDBService.deleteAccount(acc.id));

accounts.use(deleteAccountMenu);
accounts.command(BOT_DELETE_ACCOUNT.command, async (ctx) =>
    ctx.reply("Выберите счет для удаления", { reply_markup: deleteAccountMenu })
);


accounts.command(BOT_GET_ACCOUNTS.command, async (ctx) => {
    const accounts = await accountDBService.getAllAccounts(String(ctx.from?.id));

    if (accounts.length === 0) {
        await ctx.reply('Счета отсутствуют');
    } else {
        for (let i = 0; i < accounts.length; i++) {
            await ctx.reply(`Счет <b>${accounts[i].name}</b> - <i>${accounts[i].value} р</i>`, { parse_mode: "HTML" })
        }
    }


});
