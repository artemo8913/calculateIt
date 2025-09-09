import { Bot } from "grammy"

export function createBot(token: string) {
    const bot = new Bot(token);


    bot.command("start", async (ctx) => {
        const message_id = ctx.message?.message_id;

        let reply_parameters;

        if (message_id) {
            reply_parameters = { message_id }
        }


        await ctx.reply(`Привет! Это приложение для подсчета чего-либо. id = ${ctx.message?.chat.id}`,
            {
                reply_parameters
            })
    });

    bot.on("edited_message", async (ctx) => {
        // Получите новый, отредактированный текст сообщения.
        const editedText = ctx.editedMessage.text;

        await ctx.reply(`${ctx.editedMessage.message_id}`);
    });

    bot.on("message:text", async (ctx) => {
        if (ctx.message.text === "html") {
            await ctx.reply("<b>Привет!</b> <i>Добро пожаловать</i> в <a href=\"https://grammy.dev\">grammY</a>.", { parse_mode: "HTML" })
        }
    });

    bot.on("message:entities", async (ctx) => {
        // Получите все сущности.
        const entities = ctx.entities();

        // Получите текст первой сущности.
        entities[0].text;

        // Получать сущности которые являются электронной почтой
        const emails = ctx.entities("email");

        // Получать сущности которые являются электронной почтой и номером телефона
        const phonesAndEmails = ctx.entities(["email", "phone_number"]);

        await ctx.reply(`${phonesAndEmails.join(",")}`)

    });

    bot.on("message_reaction", async (ctx) => {
        const { emojiAdded } = ctx.reactions();
        if (emojiAdded.includes("🎉")) {
            await ctx.reply("вечеринОчка :D");
        }
    });

    bot.on("message:text", async (ctx) => {
        await ctx.reply(ctx.message.text)
    });

    return bot;
}
