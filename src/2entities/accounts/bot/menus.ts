import { Menu, MenuRange, MenuFlavor } from "@grammyjs/menu";
import { Conversation } from "@grammyjs/conversations";

import { BotContext } from "@/1shared/bot";

import { Account } from "../model/accounts.types";
import { accountsDBService } from "../model/accountsDB.service";

function buildAccountMenu(name: string, callback: (ctx: BotContext & MenuFlavor, acc: Account) => Promise<unknown> | unknown) {
    return new Menu<BotContext>(name)
        .dynamic(async (ctx) => {
            const range = new MenuRange<BotContext>();

            const accounts = await accountsDBService.getAllAccounts(String(ctx.from?.id));

            accounts.forEach(acc => range.text(`${acc.name} ${acc.value}Р`, async (ctx) => {
                await callback(ctx, acc);
            }).row());
            return range;
        })
        .back("Назад");
};

const accountsMainMenu = new Menu<BotContext>("accountsMainMenu")
    .submenu("Посмотреть все", "selectAccountMenu").row()
    .submenu("Удалить счет", "deleteAccountMenu").row()
    .text("Добавить счет", (ctx) => ctx.conversation.enter("createAccountConversation")).row()
    .text("Переименовать счет").row()
    .text("Перенести затраты со счета на счет").row()
    .back("Назад");

const buildAccountsMainMenuClone = (conversation: Conversation<BotContext, BotContext>) => {
    return conversation.menu("accountsMainMenu")
        .text("Посмотреть все").row()
        .text("Удалить счет").row()
        .text("Добавить счет").row()
        .text("Переименовать счет").row()
        .text("Перенести затраты со счета на счет").row()
        .back("Назад");
}

const selectAccountMenu = buildAccountMenu("selectAccountMenu", (ctx) => {
    ctx.menu.update();
});

const deleteAccountMenu = buildAccountMenu("deleteAccountMenu", async (ctx, acc) => {
    await accountsDBService.deleteAccount(acc.id);
    ctx.menu.update();
});

export {
    accountsMainMenu,
    selectAccountMenu,
    deleteAccountMenu,
    buildAccountMenu,
    buildAccountsMainMenuClone
};