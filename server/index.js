import * as dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import TelegramBot from "node-telegram-bot-api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Загрузка переменных окружения из .env.local
dotenv.config({ path: resolve(__dirname, "../.env") });

if (!process.env.TOKEN) {
  throw new Error("Token don't exist");
}

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

const WEB_URL = "https://artemo8913.github.io/calculateIt/";

bot.setMyCommands(
  [
    { command: "/start", description: "Начать работу с ботом" },
    { command: "/info", description: "Узнать кто ты по масте" },
  ],
  { scope: { type: "all_private_chats" } }
);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    await bot.sendMessage(chatId, `Привет! Я - бот. Заполни форму`, {
      reply_markup: {
        inline_keyboard: [[{ text: "Заполни форму", web_app: { url: WEB_URL } }]],
      },
    });
    await bot.sendMessage(chatId, `Форму можно заполнить ещё по большой кнопке`, {
      reply_markup: {
        keyboard: [[{ text: "Заполни форму", web_app: { url: WEB_URL } }]],
      },
    });
    return;
  }
  if (text === "/info") {
    return bot.sendMessage(chatId, `Тебя зовут ${msg.from?.first_name} ${msg.from?.last_name}`);
  }
  return bot.sendMessage(chatId, `Я тебя не понимаю...`);
});
