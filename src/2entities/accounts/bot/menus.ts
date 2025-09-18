import { Menu, MenuRange } from "@grammyjs/menu";

import { BotContext } from "@/1shared/bot";

import { Account } from "../model/accounts.types";
import { accountsDBService } from "../model/accountsDB.service";
import { Conversation } from "@grammyjs/conversations";

function buildAccountMenu(name: string, callback: (acc: Account) => Promise<unknown> | unknown) {
    return new Menu<BotContext>(name)
        .dynamic(async (ctx) => {
            const range = new MenuRange<BotContext>();

            const accounts = await accountsDBService.getAllAccounts(String(ctx.from?.id));

            accounts.forEach(acc => range.text(`${acc.name} ${acc.value}Р`, async (ctx) => {
                await callback(acc);
                ctx.menu.update();
            }).row());
            return range;
        })
        .back("Назад");
};

const accountsMainMenu = new Menu<BotContext>("accountsMainMenu")
    .submenu("Посмотреть все", "selectAccountMenu").row()
    .submenu("Удалить счет", "deleteAccountMenu").row()
    .text("Добавить счет", (ctx) => ctx.conversation.enter("createAccount")).row()
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

const selectAccountMenu = buildAccountMenu("selectAccountMenu", () => { });

const deleteAccountMenu = buildAccountMenu("deleteAccountMenu", async (acc) => await accountsDBService.deleteAccount(acc.id));

export { accountsMainMenu, selectAccountMenu, deleteAccountMenu, buildAccountsMainMenuClone };