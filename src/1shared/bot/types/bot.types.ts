import { Context, SessionFlavor } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";

export type SessionStore = {
}

export type BotContext = ConversationFlavor<Context & SessionFlavor<SessionStore>>;
