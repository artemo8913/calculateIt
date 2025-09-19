import { SessionStore } from "./bot.types";

export const getInitialStore = (): SessionStore => ({
    tempTransaction: {
        accountId: 0,
        categoryId: -1,
        tgId: "",
        type: "out",
        value: "0",
    }
});