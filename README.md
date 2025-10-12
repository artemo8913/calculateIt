# CalculateIt - Психологический помощник в Telegram

**CalculateIt** - это Telegram бот с интегрированной Mini App (TMA)^[на этапе разработки], созданный для психологической поддержки и работы с тревожными состояниями. Проект помогает пользователям фиксировать, анализировать и управлять своими мыслями и переживаниями через структурированные диалоги.

## 🧠 Особенности и назначение

Проект предназначен для помощи в осознании и работе с тревожными мыслями через несколько ключевых функций:

- **📝 Фиксация тревог** - запись тревожных мыслей
- **💭 Анализ мыслей** - пересмотр мыслей в спокойном состоянии
- **🙏 Практика благодарности** - фиксация позитивных моментов
- **📊 Экспорт данных** - возможность выгрузки всех записей в Excel для самостоятельного анализа


## 🏗 Архитектура и технологии

### Технический стек
- **Фронтенд**: Next.js 15.3 с App Router, React 18, TypeScript
- **Telegram интеграция**: Grammy фреймворк, Telegram Mini Apps SDK
- **База данных**: PostgreSQL + Drizzle ORM
- **Хостинг**: Vercel (TMA + API routes)

## ⚙️ Настройка окружения

### Предварительные требования
- Node.js 18+
- Аккаунт Telegram с доступом к [BotFather](https://t.me/botfather)
- [Vercel](https://vercel.com) аккаунт для хостинга бота с github репозитория
- [Supabase](https://supabase.com) аккаунт для базы данных (можно создать аккаунт из supabase)

### Локальная разработка

1. **Клонирование и установка зависимостей**
```bash
git clone https://github.com/artemo8913/calculateIt.git
cd calculateIt
npm ci
```

2. **Настройка переменных окружения**
Создайте `.env.local` на основе `.env.example`:

```env
# File must name .env.local

# Next.js
VERCEL = "1"
NEXTAUTH_URL = "https://your-app.vercel.app"
NEXTAUTH_SECRET = "your_nextauth_secret"

# Telegram
TELEGRAM_BOT_TOKEN = "your_main_bot_token_from_bot_father"
TELEGRAM_DEV_BOT_TOKEN = "your_dev_bot_token_from_bot_father"
TELEGRAM_DEV_WEBHOOK_URL = "https://api.telegram.org/bot{telegram_bot_token}/setWebhook?url={vercel_url}/api/bot"

# База данных
DATABASE_URL = "db_connection_string_from_supabase"
```

3. **Запуск в режиме разработки**
```bash
# Запуск Next.js на localhost с HTTPS (для TMA) и бота с long polling
npm run dev
```
Проект использует [nextjs-template](https://github.com/Telegram-Mini-Apps/nextjs-template) с поддержкой самоподписанных SSL-сертификатов для локальной разработки TMA.

Можно запускать отдельно режим разработки бота и TMA:
- **Бот**: long polling через `npm run dev:bot`
- **TMA**: HTTPS-сервер через `npm run dev:https`

### Продакшен-режим

Бот в prod режиме работает с помощью API routes ([статья](https://www.launchfa.st/blog/telegram-nextjs-app-router))

## 🔐 Безопасность и этические соображения

### Текущая ситуация с данными
На данный момент данные хранятся в Supabase **без шифрования**. Как разработчик, я технически имею доступ к данным пользователей, что создает этическую дилемму для приложения, работающего с конфиденциальной психологической информацией. Поэтому рекомендую самостоятельно разворачивать проект со своей БД.

## 🚀 Развертывание

### Стандартное развертывание на Vercel
1. Создайте форк репозитория
2. Подключите репозиторий к Vercel
3. Настройте переменные окружения в панели Vercel
4. Деплой автоматически запустится при пуше в main^[https://vercel.com/docs/git]

