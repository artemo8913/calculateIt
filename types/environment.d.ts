declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VERCEL?: "1";
            NEXTAUTH_URL?: string;
            NEXTAUTH_SECRET?: string;

            // https://nextjs.org/docs/messages/non-standard-node-env
            // не должно быть в .env файле, next.js самостоятельно проставляет значение
            NODE_ENV?: "production" | "development" | "test";
            /**Токен от bot father для итога проекта */
            TELEGRAM_BOT_TOKEN?: string;
            /**Токен от bot father для отладки проекта*/
            TELEGRAM_DEV_BOT_TOKEN?: string;
            /**Сгенерированная ссылка для Drizzle в Supabase. Пароль в ссылке проставил из переменных окружения проекта с сайта vercel */
            DATABASE_URL?: string;
        }
    }
}
export { };
