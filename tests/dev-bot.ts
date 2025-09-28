import { createBot } from '@/telegram';

const token = process.env.TELEGRAM_DEV_BOT_TOKEN;
const mode = process.env.NODE_ENV
const isDev = mode === "development";

if (!token) {
    throw new Error("TELEGRAM_DEV_BOT_TOKEN is not set");
}

if (mode && !isDev) {
    throw new Error("Long polling in not dev mode is not available");
}

const bot = await createBot(token);

// Запускаем бота в режиме Long Polling
bot.start();