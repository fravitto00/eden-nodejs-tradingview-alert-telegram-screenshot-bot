import { captureTradingViewScreenshot } from '../services/puppeteer.js';
import { sendScreenshot, sendScreenshotInfo } from '../services/telegram.js';
import fs from 'fs';

// Handle requests to the TradingView webhook
async function handleWebhook(requestBody) {
  const symbol = requestBody.symbol;
  const tradingViewAlert = requestBody.message;

  // Capture screenshot of TradingView chart
  const screenshot = await captureTradingViewScreenshot(symbol);

  // Send screenshot and alert message to Telegram
  const screenshotReturn = await sendScreenshot(screenshot);
  await sendScreenshotInfo(tradingViewAlert);

  console.log('Screenshot and alert message sent to Telegram');
  // Save the screenshot in local file system
  fs.writeFileSync('screenshot.png', screenshot, 'base64');
  // Console log the response from the Telegram API
  console.log(screenshotReturn);

  return { screenshot, tradingViewAlert };
}

export { handleWebhook };