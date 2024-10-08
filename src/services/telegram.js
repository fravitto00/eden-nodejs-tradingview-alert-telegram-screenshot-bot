import fetch from 'node-fetch';

async function sendScreenshot(screenshot) {
  const chatId = process.env.ENV_CHAT_ID;
  const formData = new URLSearchParams();
  formData.append('chat_id', chatId);
  formData.append('photo', `data:image/png;base64,${screenshot}`);

  return (await fetch(apiUrl('sendPhoto'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  })).json();
}

async function sendScreenshotInfo(tradingViewAlert) {
  const chatId = process.env.ENV_CHAT_ID;
  const formData = new URLSearchParams();
  formData.append('chat_id', chatId);
  formData.append('text', tradingViewAlert);

  return (await fetch(apiUrl('sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  })).json();
}

function apiUrl(methodName) {
  const TOKEN = process.env.ENV_BOT_TOKEN;
  return `https://api.telegram.org/bot${TOKEN}/${methodName}`;
}

export { sendScreenshot, sendScreenshotInfo };