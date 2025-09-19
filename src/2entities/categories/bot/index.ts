import { Composer } from "grammy";

import { BotContext } from "@/1shared/bot";

import { categoriesMainMenu, selectCategoriesMenu, deleteCategoryMenu } from "./menus";

const categoriesComposer = new Composer<BotContext>();

categoriesMainMenu.register(selectCategoriesMenu);
categoriesMainMenu.register(deleteCategoryMenu);
categoriesComposer.use(categoriesMainMenu);

export { categoriesComposer, categoriesMainMenu };