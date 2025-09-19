import { Context, SessionFlavor } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";

import { transactionsTable } from "@/1shared/database";

export type SessionStore = {
    tempTransaction: typeof transactionsTable.$inferInsert
}

export type BotContext = ConversationFlavor<Context & SessionFlavor<SessionStore>>;
