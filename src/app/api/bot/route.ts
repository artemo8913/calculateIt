export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { webhookCallback } from "grammy";

import { createBot } from "@/telegram";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");
}

if (process.env.NODE_ENV === "development") {
    throw new Error("Telegram bot (webhook) can't run as api route in development mod");
}

const bot = createBot(token);

export const POST = webhookCallback(bot, "std/http")