import { Bot, Context } from "grammy";

import { BOT_STARTUP_COMMANDS, BOT_START, BOT_GET_ACCOUNTS } from "./commands";
import { accounts } from "./accounts";
import { BOT_TEXT } from "./text";
import { mainMenu } from "./menus";
import { Conversation, ConversationFlavor, conversations, createConversation } from "@grammyjs/conversations";

export function createBot(token: string) {
    const bot = new Bot<ConversationFlavor<Context>>(token);

    bot.api.setMyCommands(BOT_STARTUP_COMMANDS);

    /** Определение диалога */
    async function hello(conversation: Conversation, ctx: Context) {
        await ctx.reply("Привет! Как тебя зовут?");
        const { message } = await conversation.waitFor("message:text");
        await ctx.reply(`Добро пожаловать в чат, ${message.text}!`);
    }


    bot.use(conversations());
    bot.use(mainMenu);
    bot.use(accounts);
    bot.use(createConversation(hello));

    bot.command("enter", async (ctx) => {
        // Вход в функцию "hello", которую вы объявили.
        await ctx.conversation.enter("hello");
    });

    bot.command(BOT_START.command, async (ctx) => {
        const message_id = ctx.message?.message_id;

        let reply_parameters;

        if (message_id) {
            reply_parameters = { message_id };
        }

        await ctx.reply("Посмотрите на это меню:", { reply_markup: mainMenu });

        await ctx.reply(BOT_TEXT.greeting + " " + `id = ${ctx.message?.chat.id}`, { reply_parameters });
    });

    bot.on("edited_message", async (ctx) => {
        // Получите новый, отредактированный текст сообщения.
        const editedText = ctx.editedMessage.text;

        await ctx.reply(`${ctx.editedMessage.message_id} ${editedText}`);
    });

    bot.on("message:text", async (ctx) => {
        await ctx.reply("Просто сообщение от: " + "ctx.msg.from.id", { parse_mode: "HTML" });
        await ctx.replyWithDice("🎲");
    });

    bot.on("message:entities", async (ctx) => {
        // Получите все сущности.
        const entities = ctx.entities();
        console.log(entities);
        // Получите текст первой сущности.
        entities[0].text;

        // Получать сущности которые являются электронной почтой
        const emails = ctx.entities("email");

        // Получать сущности которые являются электронной почтой и номером телефона
        const phonesAndEmails = ctx.entities(["email", "phone_number"]);

        await ctx.reply(`${phonesAndEmails.join(",")}`)

    });

    bot.on("message_reaction", async (ctx) => {
        console.log("message_reaction");
        const { emojiAdded } = ctx.reactions();
        if (emojiAdded.includes("👍")) {
            await ctx.reply("вечеринОчка :D");
        }
    });

    return bot;
}
