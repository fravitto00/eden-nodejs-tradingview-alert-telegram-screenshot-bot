import fetch from 'node-fetch';

async function sendScreenshot(screenshot) {
  const chatId = process.env.ENV_CHAT_ID;
  const formData = new FormData();
  formData.append('chat_id', chatId);

  const blob = new Blob([screenshot], { type: "image/png" });
  formData.append("photo", blob);

  const response = await fetch(apiUrl('sendPhoto'), {
    method: 'POST',
    body: formData,
  });

  const jsonResponse = await response.json();
  return jsonResponse;
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