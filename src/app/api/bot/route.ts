export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { webhookCallback } from "grammy";

import { createBot } from "@/telegram";

const token = process.env.TELEGRAM_BOT_TOKEN;
const isProd = process.env.NODE_ENV === "production";

if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");
}

if (!isProd) {
    throw new Error("Webhook in not prod mode is not available");
}

const bot = await createBot(token);

export const POST = webhookCallback(bot, "std/http")