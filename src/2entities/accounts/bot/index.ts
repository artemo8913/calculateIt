import { Composer } from "grammy";
import { createConversation } from "@grammyjs/conversations";

import { BotContext } from "@/1shared/bot";

import { createAccount } from "./conversations";
import { accountsMainMenu, selectAccountMenu, deleteAccountMenu } from "./menus";

const accountsComposer = new Composer<BotContext>();
accountsComposer.use(createConversation(createAccount));

accountsMainMenu.register(selectAccountMenu);
accountsMainMenu.register(deleteAccountMenu);
accountsComposer.use(accountsMainMenu);

export { accountsComposer, accountsMainMenu };