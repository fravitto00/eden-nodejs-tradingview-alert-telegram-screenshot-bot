# Node.js TradingView Webhook Project

This project sets up a Node.js server to handle TradingView webhook requests and send information to a Telegram bot.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory and add the following:
    - ENV_BOT_TOKEN=your_telegram_bot_token
    - ENV_CHAT_ID=your_chat_id
4. Start the server: `npm run start`