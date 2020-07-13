const puppeteer = require('puppeteer');
const fighter_detail = require('./fighter-detail-scrapper');

// let fighter = {
//   name : "",
//   kd : "",
//   sigStrikes : "",
//   sigStrikesPer : "",
//   totalStrikes : "",
//   takedown : "",
//   takedownPer : "",
//   submissionAttempts : "",
//   pass : "",
//   reverse : ""
// };


(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null
  });

  const url = "http://ufcstats.com/fighter-details/029eaff01e6bb8f0";

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil : "networkidle2"
  });

  await fighter_detail.setup(page);
  let urls = await fighter_detail.getFightURLs(page);
  console.log(urls);
  await fighter_detail.extractDatafromFights(urls,page);
  
  browser.close();
})();
