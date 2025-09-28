import { Context, SessionFlavor } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";


export type SessionStore = {
    thoughts: string,
    emotion: string,
    conditions: string,
}

export type BotContext = ConversationFlavor<Context & SessionFlavor<SessionStore>>;
