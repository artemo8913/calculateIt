const dotenv = require("dotenv");
const path = require("path");
const { createBot } = require("../src/telegram");

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const token = process.env.TELEGRAM_DEV_BOT_TOKEN;

if (!token) {
    throw new Error("TELEGRAM_DEV_BOT_TOKEN environment variable not found.");
}

if (process.env.NODE_ENV) {
    throw new Error("Telegram bot (long polling) can't run with next.js");
}

const bot = createBot(token);

bot.start();