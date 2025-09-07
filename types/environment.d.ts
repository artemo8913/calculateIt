declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VERCEL?: "1";
            NEXTAUTH_URL?: string;
            NEXTAUTH_SECRET?: string;

            // https://nextjs.org/docs/messages/non-standard-node-env
            // не должно быть в .env файле, next.js самостоятельно проставляет значение
            NODE_ENV?: "production" | "development" | "test";

            TELEGRAM_BOT_TOKEN?: string;
            TELEGRAM_DEV_BOT_TOKEN?: string;
        }
    }
}
export { };
