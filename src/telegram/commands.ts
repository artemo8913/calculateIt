import { BotCommand } from "grammy/types";

export const BOT_START: BotCommand = { command: "start", description: "Начать работу с ботом" };
export const BOT_INFO: BotCommand = { command: "info", description: "Что делает бот?" };

export const BOT_GET_ACCOUNTS: BotCommand = { command: "get_accounts", description: "Показать счета" };
export const BOT_CREATE_ACCOUNT: BotCommand = { command: "create_account", description: "Создать счет" };
export const BOT_DELETE_ACCOUNT: BotCommand = { command: "delete_account", description: "Удалить счет" };

export const BOT_STARTUP_COMMANDS: BotCommand[] = [
    BOT_START,
    BOT_INFO,
    BOT_GET_ACCOUNTS,
    BOT_CREATE_ACCOUNT,
    BOT_DELETE_ACCOUNT
];