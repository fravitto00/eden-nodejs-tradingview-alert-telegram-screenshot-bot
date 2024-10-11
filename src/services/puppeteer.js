import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

async function captureTradingViewScreenshot(symbol) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const cookieToPreventBanner = {
    "name": "cookiePrivacyPreferenceBannerProduction",
    "value": "accepted",
    "domain": ".tradingview.com",
  }
  await page.setCookie(cookieToPreventBanner);
  await page.goto(`https://it.tradingview.com/chart/GoLIDkHa/?symbol=${symbol}`);
  await page.setViewport({ width: 414, height: 414 });

  const graphElement = await page.waitForSelector('body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center > div > div.chart-container-border > div > div.chart-markup-table');
  const screenshot = await graphElement.screenshot();
  await browser.close();
  return screenshot;
}

export { captureTradingViewScreenshot };