import { Context } from "grammy";
import { Conversation, ConversationFlavor } from "@grammyjs/conversations";

import { Transaction } from "@/2entities/transactions";

export type SessionStore = {
    tempTransaction: Transaction
}

export type BotContext = ConversationFlavor<Context & SessionStore>;
export type BotConversation = Conversation<BotContext>;
