import puppeteer from "puppeteer";

async function captureTradingViewScreenshot(graphLink) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const cookieToPreventBanner = {
    "name": "cookiePrivacyPreferenceBannerProduction",
    "value": "accepted",
    "domain": ".tradingview.com",
  }
  await page.setCookie(cookieToPreventBanner);
  await page.goto(graphLink);

  const graphElement = await page.waitForSelector('body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center > div > div.chart-container-border > div > div.chart-markup-table');
  const screenshot = await graphElement.screenshot();
  await browser.close();
  return screenshot;
}

export { captureTradingViewScreenshot };