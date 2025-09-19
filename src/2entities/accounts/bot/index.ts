import { Composer } from "grammy";

import { BotContext } from "@/1shared/bot";

import { accountsMainMenu, selectAccountMenu, deleteAccountMenu } from "./menus";

const accountsComposer = new Composer<BotContext>();

accountsMainMenu.register(selectAccountMenu);
accountsMainMenu.register(deleteAccountMenu);
accountsComposer.use(accountsMainMenu);

export { accountsComposer, accountsMainMenu };