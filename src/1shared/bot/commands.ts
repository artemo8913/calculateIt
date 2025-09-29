import { BotCommand } from "grammy/types";

export const BOT_START: BotCommand = { command: "start", description: "Начать работу с ботом" };
export const BOT_INFO: BotCommand = { command: "info", description: "Что делает бот?" };

export const BOT_CREATE_THOUGHT: BotCommand = { command: "create_thought", description: "Добавить мысль" };
export const BOT_CREATE_ADVICE: BotCommand = { command: "create_advice", description: "Переосмысль" };
export const BOT_EXPORT_DB: BotCommand = { command: "export_db", description: "Экспортировать excel" };

export const BOT_STARTUP_COMMANDS: BotCommand[] = [
    BOT_START,
    BOT_INFO,
    BOT_CREATE_THOUGHT,
    BOT_CREATE_ADVICE,
    BOT_EXPORT_DB
];