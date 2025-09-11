import { createBot } from '@/telegram';

const token = process.env.TELEGRAM_DEV_BOT_TOKEN;
const isDev = process.env.NODE_ENV === "development";

if (!token) {
    throw new Error("TELEGRAM_DEV_BOT_TOKEN is not set");
}

if (!isDev) {
    throw new Error("Long polling in not dev mode is not available");
}

const bot = createBot(token);

// Запускаем бота в режиме Long Polling
bot.start();