import puppeteer from "puppeteer";

async function captureTradingViewScreenshot(symbol) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://it.tradingview.com/chart/GoLIDkHa/?symbol=${symbol}`);

  const graphElement = await page.waitForSelector('body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center > div > div.chart-container-border > div > div.chart-markup-table');
  const screenshot = await graphElement.screenshot({ encoding: 'base64' }); // Use base64 encoding
  await browser.close();
  return screenshot;
}

export { captureTradingViewScreenshot };