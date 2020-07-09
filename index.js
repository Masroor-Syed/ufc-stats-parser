const puppeteer = require('puppeteer');

let fighter = {
  name : "",
  kd : "",
  sigStrikes : "",
  sigStrikesPer : "",
  totalStrikes : "",
  takedown : "",
  takedownPer : "",
  submissionAttempts : "",
  pass : "",
  reverse : ""
};


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

  const table = "table";
  await page.waitForSelector(table);

  // add it manually and expose to window
  await page.evaluate(() => {
    window.getSummaryData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = []
      for(i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }
      return {
        win : {
          name : temp[0].trim(),
          kd : temp[2].trim(),
          sigStrikes : temp[4].trim(),
          sigStrikesPer : temp[6].trim(),
          totalStrikes : temp[8].trim(),
          takedown : temp[10].trim(),
          takedownPer : temp[12].trim(),
          submissionAttempts : temp[14].trim(),
          pass : temp[16].trim(),
          reverse : temp[18].trim()
        },
        lost : {
          name : temp[1].trim(),
          kd : temp[3].trim(),
          sigStrikes : temp[5].trim(),
          sigStrikesPer : temp[7].trim(),
          totalStrikes : temp[9].trim(),
          takedown : temp[11].trim(),
          takedownPer : temp[13].trim(),
          submissionAttempts : temp[15].trim(),
          pass : temp[17].trim(),
          reverse : temp[19].trim()
        }
      }
    }

    window.getRoundSummaryData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = []
      for(i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }
      
      let numRound = (tlb.getElementsByTagName("tr").length - 1) / 2;
      let tempsum = [];
      const base_offset = 20;
      for(i = 0; i < numRound; i++) {
        tempsum.push(
          {
            win : {
              name : temp[0+(base_offset*i)].trim(),
              kd : temp[2+(base_offset*i)].trim(),
              sigStrikes : temp[4+(base_offset*i)].trim(),
              sigStrikesPer : temp[6+(base_offset*i)].trim(),
              totalStrikes : temp[8+(base_offset*i)].trim(),
              takedown : temp[10+(base_offset*i)].trim(),
              takedownPer : temp[12+(base_offset*i)].trim(),
              submissionAttempts : temp[14+(base_offset*i)].trim(),
              pass : temp[16+(base_offset*i)].trim(),
              reverse : temp[18+(base_offset*i)].trim()
            },
            lost : {
              name : temp[1+(base_offset*i)].trim(),
              kd : temp[3+(base_offset*i)].trim(),
              sigStrikes : temp[5+(base_offset*i)].trim(),
              sigStrikesPer : temp[7+(base_offset*i)].trim(),
              totalStrikes : temp[9+(base_offset*i)].trim(),
              takedown : temp[11+(base_offset*i)].trim(),
              takedownPer : temp[13+(base_offset*i)].trim(),
              submissionAttempts : temp[15+(base_offset*i)].trim(),
              pass : temp[17+(base_offset*i)].trim(),
              reverse : temp[19+(base_offset*i)].trim()
            }
          }
        );
      }

      let summaries = {}
      for(i = 0; i < tempsum.length; i++) {
        summaries[i+1] = tempsum[i]
      }

      return summaries;
    }

    window.getSigStrikesData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = []
      for(i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }
      return {
        win : {
          name : temp[0].trim(),
          sigStrikes : temp[2].trim(),
          sigStrikesPer : temp[4].trim(),
          head : temp[6].trim(),
          body : temp[8].trim(),
          leg : temp[10].trim(),
          distance : temp[12].trim(),
          clinch : temp[14].trim(),
          ground : temp[16].trim()
        },
        lost : {
          name : temp[1].trim(),
          sigStrikes : temp[3].trim(),
          sigStrikesPer : temp[5].trim(),
          head : temp[7].trim(),
          body : temp[9].trim(),
          leg : temp[11].trim(),
          distance : temp[13].trim(),
          clinch : temp[15].trim(),
          ground : temp[17].trim()
        }
      }
    }

    window.getRoundStrikingData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = []
      for(i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }
      
      let numRound = (tlb.getElementsByTagName("tr").length - 1) / 2;
      let tempsum = [];
      const base_offset = 18;
      for(i = 0; i < numRound; i++) {
        tempsum.push(
          {
            win : {
              name : temp[0+(base_offset*i)].trim(),
              sigStrikes : temp[2+(base_offset*i)].trim(),
              sigStrikesPer : temp[4+(base_offset*i)].trim(),
              head : temp[6+(base_offset*i)].trim(),
              body : temp[8+(base_offset*i)].trim(),
              leg : temp[10+(base_offset*i)].trim(),
              distance : temp[12+(base_offset*i)].trim(),
              clinch : temp[14+(base_offset*i)].trim(),
              ground : temp[16+(base_offset*i)].trim()
            },
            lost : {
              name : temp[1+(base_offset*i)].trim(),
              sigStrikes : temp[3+(base_offset*i)].trim(),
              sigStrikesPer : temp[5+(base_offset*i)].trim(),
              head : temp[7+(base_offset*i)].trim(),
              body : temp[9+(base_offset*i)].trim(),
              leg : temp[11+(base_offset*i)].trim(),
              distance : temp[13+(base_offset*i)].trim(),
              clinch : temp[15+(base_offset*i)].trim(),
              ground : temp[17+(base_offset*i)].trim()
            }
          }
        );
      }

      let summaries = {}
      for(i = 0; i < tempsum.length; i++) {
        summaries[i+1] = tempsum[i]
      }
      
      return summaries;
    }

  });

  const tables_data = await page.evaluate(async () => {
    let tlb = Array.from(document.querySelectorAll("table"))
    // get data from first table
    return [getSummaryData(tlb[0]),getRoundSummaryData(tlb[1]),getSigStrikesData(tlb[2]),getRoundStrikingData(tlb[3])];
  });

  console.log(tables_data);

  browser.close();
})();
