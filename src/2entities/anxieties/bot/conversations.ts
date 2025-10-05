import { Conversation } from "@grammyjs/conversations";

import { BotContext, buildCancelMenu } from "@/1shared/bot";

import { anxietiesDBService } from "../model/anxietiesDB.service";

export async function createAnxietyConversation(conversation: Conversation<BotContext, BotContext>, ctx: BotContext) {
    if (!ctx.from?.id) {
        throw new Error("Error while create anxiety");
    }

    const backMenu = buildCancelMenu(conversation);

    await ctx.reply("Что тебя беспокоит? Что может случится плохого?", { reply_markup: backMenu });
    const anxiety = await conversation.form.text();

    await ctx.reply("Насколько это вероятно. Введи число от 0 до 10", { reply_markup: backMenu });
    const probability = await conversation.form.number();

    await ctx.reply("Что самое плохое может случится?", { reply_markup: backMenu });
    const worstConsequence = await conversation.form.text();

    await ctx.reply("Если случится самое плохое, то как ты сможешь справиться с этим?", { reply_markup: backMenu });
    const preventionActions = await conversation.form.text();

    await ctx.reply("Чтобы ты сказал другу, если бы у него появились подобные мысли?", { reply_markup: backMenu });
    const advice = await conversation.form.text();

    await conversation.external(() => anxietiesDBService.createAnxiety({
        tgId: String(ctx.from!.id),
        advice,
        anxiety,
        probability,
        worstConsequence,
        preventionActions,
    }));

    let resultMsg = "";
    resultMsg += `Тревога: ${anxiety}\n`;
    resultMsg += `Вероятность: ${probability}\n`;
    resultMsg += `Наихудший исход: ${worstConsequence}\n`;
    resultMsg += `Как справишься: ${preventionActions}\n`;
    resultMsg += `Совет друга: ${advice}`;

    await ctx.reply(resultMsg);
}
