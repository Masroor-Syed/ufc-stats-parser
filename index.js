const puppeteer = require('puppeteer');
const fight_detail = require('./fight-detail-scrapper');

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

  const url = "http://www.ufcstats.com/fight-details/f8dd1e75978a3957";

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil : "networkidle2"
  });
  
  await fight_detail.setup(page);
  const fstat = await fight_detail.getTotalFightStats(page);
  const rsum = await fight_detail.getRoundSummary(page);
  const fstrk = await fight_detail.getSigStrikes(page);
  const rstrk = await fight_detail.getRoundStriking(page);
  const fsum =  await fight_detail.getFightSummary(page);

  console.log(fstat);
  console.log("---");
  console.log(rsum);
  console.log("---");
  console.log(fstrk);
  console.log("---");
  console.log(rstrk);
  console.log("---");
  console.log(fsum);



  browser.close();
})();
