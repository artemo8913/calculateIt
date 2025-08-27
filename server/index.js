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

const numsStore = {};

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

/**
 * @type TelegramBot.SendMessageOptions
 */
const KEYBOARD_GAME_OPTIONS = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  },
};

/**
 * @type TelegramBot.SendMessageOptions
 */
const KEYBOARD_AGAIN_OPTIONS = {
  reply_markup: { inline_keyboard: [[{ text: "Еще разочек?", callback_data: "/again" }]] },
};

/**
 *
 * @param {number} chatId
 * @returns
 */
async function startGame(chatId) {
  await bot.sendMessage(chatId, "загадаю число 0 - 9. Отгадай его");
  const num = Math.floor(Math.random() * 10);

  numsStore[chatId] = num;

  console.log(num);

  return bot.sendMessage(chatId, "Отгадывай", KEYBOARD_GAME_OPTIONS);
}

bot.setMyCommands(
  [
    { command: "/start", description: "Начать работу с ботом" },
    { command: "/info", description: "Узнать кто ты по масте" },
    { command: "/game", description: "Сыграем в игру" },
  ],
  { scope: { type: "all_private_chats" } }
);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/509/656/509656c3-0b65-49bf-a4b1-bb017d285daf/1.webp");
    return bot.sendMessage(chatId, `В жопу себе засунь свой /start`);
  }
  if (text === "/info") {
    return bot.sendMessage(chatId, `Тебя зовут ${msg.from?.first_name} ${msg.from?.last_name}`);
  }
  if (text === "/game") {
    return startGame(chatId);
  }
  return bot.sendMessage(chatId, `Что ты несешь, мать твою?`);
});

bot.on("callback_query", (msg) => {
  const data = msg.data;
  const chatId = msg.message?.chat.id;

  if (!chatId) {
    return null;
  }

  if (data === "/again") {
    return startGame(chatId);
  }

  if (numsStore[chatId] === Number(data)) {
    return bot.sendMessage(chatId, `${data}? Красава`, KEYBOARD_AGAIN_OPTIONS);
  }

  return bot.sendMessage(chatId, `${data}? Не угадал`, KEYBOARD_AGAIN_OPTIONS);
});
