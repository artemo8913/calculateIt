import { Context, SessionFlavor } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";

import { Transaction } from "@/2entities/transactions";

export type SessionStore = {
    tempTransaction: Transaction
}

export type BotContext = ConversationFlavor<Context & SessionFlavor<SessionStore>>;
