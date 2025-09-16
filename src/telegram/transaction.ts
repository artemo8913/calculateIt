import { Composer, Context } from "grammy";
import { Conversation, ConversationFlavor } from "@grammyjs/conversations";

export const transactions = new Composer<ConversationFlavor<Context>>();

async function createTransaction(ctx: Context) {
    const tgId = ctx.from?.id;
    const text = ctx.msg?.text;

    if (!tgId || !text) {

    }
}

async function deleteTransaction() {

}

async function editTransaction() {

}