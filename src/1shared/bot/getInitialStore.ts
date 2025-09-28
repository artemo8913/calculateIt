import { SessionStore } from "./bot.types";

export const getInitialStore = (): SessionStore => ({
    thoughts: "",
    emotion: "",
    conditions: "",
});