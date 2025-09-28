import { Conversation } from "@grammyjs/conversations";

import { BotContext, buildCancelMenu } from "@/1shared/bot";

import { thoughtsDBService } from "../model/thoughtsDB.service";

export async function createThoughtsConversation(conversation: Conversation<BotContext, BotContext>, ctx: BotContext) {
    if (!ctx.from?.id) {
        throw new Error("Error while create thought");
    }

    const backMenu = buildCancelMenu(conversation);

    await ctx.reply("Какие мысли?", { reply_markup: backMenu });
    const thought = await conversation.form.text();

    await ctx.reply("Что ты чувствуешь? Какие эмоции испытываешь", { reply_markup: backMenu });
    const emotion = await conversation.form.text();

    await ctx.reply("Что сейчас вокруг тебя происходит?", { reply_markup: backMenu });
    const conditions = await conversation.form.text();

    await conversation.external(() => thoughtsDBService.createThought({ tgId: String(ctx.from!.id), thought, emotion, conditions }));

    await ctx.reply(`Мысль: ${thought}\nЭмоция: ${emotion}\nОбстоятельства:${conditions}`);
}

export async function createAdviceConversation(conversation: Conversation<BotContext, BotContext>, ctx: BotContext) {
    if (!ctx.from?.id) {
        throw new Error("Error while create advise");
    }

    const backMenu = buildCancelMenu(conversation);

    const thought = await conversation.external(() => thoughtsDBService.getRandomThoughtId(String(ctx.from!.id)));

    if (thought === undefined) {
        await ctx.reply("У друга всё хорошо :) У него нет необговоренных мыслей");
        return await conversation.halt();
    }

    await ctx.reply(`Друг просит помочь и говорит: ${thought.thought}`, { reply_markup: backMenu });

    const advice = await conversation.form.text();

    await conversation.external(() => thoughtsDBService.updateThought(thought.id, { advice }));

    const userName = ctx.from.first_name || ctx.from.last_name;

    await ctx.reply(userName ? `Спасибо, ${userName}` : "Спасибо, друг");
}
