import { Menu } from "@grammyjs/menu";

import { BotContext } from "./types/bot.types";

export const mainMenu = new Menu<BotContext>("main-menu")
    .submenu("Категории", "categories").row()
    .submenu("Счета", "account-menu-select").row()
    .text("ТЕКСТ", (ctx) => ctx.reply("ТЕКСТ!")).row();




mainMenu.register(selectAccountMenu);
mainMenu.register(deleteAccountMenu);

