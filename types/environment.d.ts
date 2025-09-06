declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VERCEL?: "1";
            NEXTAUTH_URL?: string;
            NEXTAUTH_SECRET?: string;
            ENVIRONMENT?: "PROD" | "DEV";

            TELEGRAM_BOT_TOKEN?: string;
        }
    }
}
export { };
