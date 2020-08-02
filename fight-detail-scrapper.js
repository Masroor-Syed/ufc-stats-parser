async function setup(page) {
  const table = "table";
  await page.waitForSelector(table);
  // manually expose to window expose helper functions that scrap the page
  await page.evaluate(() => {
    window.getSummaryData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = [];
      for (i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }

      // clean the data
      let wsigStrkData = temp[4].trim().split("of");
      let wtotalStrkData = temp[8].trim().split("of");
      let wtdData = temp[10].trim().split("of");

      let lsigStrkData = temp[5].trim().split("of");
      let ltotalStrkData = temp[9].trim().split("of");
      let ltdData = temp[11].trim().split("of");

      return {
        win: {
          name: temp[0].trim(),
          kd: parseInt(temp[2].trim()),
          sigStrikesLanded: parseInt(wsigStrkData[0]),
          sigStrikesAttempted: parseInt(wsigStrkData[1]),
          //   sigStrikes: temp[4].trim(),
          sigStrikesPer: parseInt(temp[6].trim()),
          totalStrikesLanded: parseInt(wtotalStrkData[0]),
          totalStrikesAttempted: parseInt(wtotalStrkData[1]),
          //   totalStrikes: temp[8].trim(),
          takedownCompleted: parseInt(wtdData[0]),
          takedownAttempted: parseInt(wtdData[1]),
          //   takedown: temp[10].trim(),
          takedownPer: parseInt(temp[12].trim()),
          submissionAttempts: parseInt(temp[14].trim()),
          pass: parseInt(temp[16].trim()),
          reverse: parseInt(temp[18].trim()),
        },
        lost: {
          name: temp[1].trim(),
          kd: parseInt(temp[3].trim()),
          sigStrikesLanded: parseInt(lsigStrkData[0]),
          sigStrikesAttempted: parseInt(lsigStrkData[1]),
          //   sigStrikes: temp[5].trim(),
          sigStrikesPer: parseInt(temp[7].trim()),
          totalStrikesLanded: parseInt(ltotalStrkData[0]),
          totalStrikesAttempted: parseInt(ltotalStrkData[1]),
          //   totalStrikes: temp[9].trim(),
          takedownCompleted: parseInt(ltdData[0]),
          takedownAttempted: parseInt(ltdData[1]),
          //   takedown: temp[11].trim(),
          takedownPer: parseInt(temp[13].trim()),
          submissionAttempts: parseInt(temp[15].trim()),
          pass: parseInt(temp[17].trim()),
          reverse: parseInt(temp[19].trim()),
        },
      };
    };

    window.getRoundSummaryData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = [];
      for (i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }

      let numRound = (tlb.getElementsByTagName("tr").length - 1) / 2;
      let tempsum = [];
      const base_offset = 20;
      for (i = 0; i < numRound; i++) {
        let wsigStrkData = temp[4 + base_offset * i].trim().split("of");
        let wtotalStrkData = temp[8 + base_offset * i].trim().split("of");
        let wtdData = temp[10 + base_offset * i].trim().split("of");

        let lsigStrkData = temp[5 + base_offset * i].trim().split("of");
        let ltotalStrkData = temp[9 + base_offset * i].trim().split("of");
        let ltdData = temp[11 + base_offset * i].trim().split("of");

        tempsum.push({
          win: {
            name: temp[0 + base_offset * i].trim(),
            kd: parseInt(temp[2 + base_offset * i].trim()),
            sigStrikesLanded: parseInt(wsigStrkData[0]),
            sigStrikesAttempted: parseInt(wsigStrkData[1]),
            // sigStrikes: temp[4 + base_offset * i].trim(),
            sigStrikesPer: parseInt(temp[6 + base_offset * i].trim()),
            // totalStrikes: temp[8 + base_offset * i].trim(),
            totalStrikesLanded: parseInt(wtotalStrkData[0]),
            totalStrikesAttempted: parseInt(wtotalStrkData[1]),
            // takedown: temp[10 + base_offset * i].trim(),
            takedownCompleted: parseInt(wtdData[0]),
            takedownAttempted: parseInt(wtdData[1]),
            takedownPer: parseInt(temp[12 + base_offset * i].trim()),
            submissionAttempts: parseInt(temp[14 + base_offset * i].trim()),
            pass: parseInt(temp[16 + base_offset * i].trim()),
            reverse: parseInt(temp[18 + base_offset * i].trim()),
          },
          lost: {
            name: temp[1 + base_offset * i].trim(),
            kd: parseInt(temp[3 + base_offset * i].trim()),
            // sigStrikes: temp[5 + base_offset * i].trim(),

            sigStrikesLanded: parseInt(lsigStrkData[0]),
            sigStrikesAttempted: parseInt(lsigStrkData[1]),
            sigStrikesPer: parseInt(temp[7 + base_offset * i].trim()),

            // totalStrikes: temp[9 + base_offset * i].trim(),
            totalStrikesLanded: parseInt(ltotalStrkData[0]),
            totalStrikesAttempted: parseInt(ltotalStrkData[1]),

            // takedown: temp[11 + base_offset * i].trim(),
            takedownCompleted: parseInt(ltdData[0]),
            takedownAttempted: parseInt(ltdData[1]),
            takedownPer: parseInt(temp[13 + base_offset * i].trim()),

            submissionAttempts: parseInt(temp[15 + base_offset * i].trim()),
            pass: parseInt(temp[17 + base_offset * i].trim()),
            reverse: parseInt(temp[19 + base_offset * i].trim()),
          },
        });
      }

      let summaries = {};
      for (i = 0; i < tempsum.length; i++) {
        summaries[i + 1] = tempsum[i];
      }

      return summaries;
    };

    window.getSigStrikesData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = [];
      for (i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }
      let wsigStrkData = temp[2].trim().split("of");

      return {
        win: {
          name: temp[0].trim(),

          //   sigStrikes: temp[2].trim(),
          sigStrikesLanded: parseInt(wsigStrkData[0]),
          sigStrikesAttempted: parseInt(wsigStrkData[1]),
          sigStrikesPer: parseInt(temp[4].trim()),

          //   head: temp[6].trim(),
          headStrLanded: parseInt(temp[6].trim().split("of")[0]),
          headStrAttempted: parseInt(temp[6].trim().split("of")[1]),

          //   body: temp[8].trim(),
          bodyStrLanded: parseInt(temp[8].trim().split("of")[0]),
          bodyStrAttempted: parseInt(temp[8].trim().split("of")[1]),

          //   leg: temp[10].trim(),
          legStrLanded: parseInt(temp[10].trim().split("of")[0]),
          legStrAttempted: parseInt(temp[10].trim().split("of")[1]),

          //   distance: temp[12].trim(),
          distanceStrLanded: parseInt(temp[12].trim().split("of")[0]),
          distanceStrAttempted: parseInt(temp[12].trim().split("of")[1]),

          //   clinch: temp[14].trim(),
          clinchStrLanded: parseInt(temp[14].trim().split("of")[0]),
          clinchStrAttempted: parseInt(temp[14].trim().split("of")[1]),

          //   ground: temp[16].trim(),
          groundStrLanded: parseInt(temp[16].trim().split("of")[0]),
          groundStrAttempted: parseInt(temp[16].trim().split("of")[1]),
        },
        lost: {
          name: temp[1].trim(),

          sigStrikesLanded: parseInt(temp[3].trim().split("of")[0]),
          sigStrikesAttempted: parseInt(temp[3].trim().split("of")[1]),
          sigStrikesPer: parseInt(temp[5].trim()),

          //   head: temp[6].trim(),
          headStrLanded: parseInt(temp[7].trim().split("of")[0]),
          headStrAttempted: parseInt(temp[7].trim().split("of")[1]),

          //   body: temp[8].trim(),
          bodyStrLanded: parseInt(temp[9].trim().split("of")[0]),
          bodyStrAttempted: parseInt(temp[9].trim().split("of")[1]),

          //   leg: temp[10].trim(),
          legStrLanded: parseInt(temp[11].trim().split("of")[0]),
          legStrAttempted: parseInt(temp[11].trim().split("of")[1]),

          //   distance: temp[12].trim(),
          distanceStrLanded: parseInt(temp[13].trim().split("of")[0]),
          distanceStrAttempted: parseInt(temp[13].trim().split("of")[1]),

          //   clinch: temp[14].trim(),
          clinchStrLanded: parseInt(temp[15].trim().split("of")[0]),
          clinchStrAttempted: parseInt(temp[15].trim().split("of")[1]),

          //   ground: temp[16].trim(),
          groundStrLanded: parseInt(temp[17].trim().split("of")[0]),
          groundStrAttempted: parseInt(temp[17].trim().split("of")[1]),
        },
      };
    };

    window.getRoundStrikingData = function (tlb) {
      let rawData = tlb.getElementsByClassName("b-fight-details__table-text");
      let temp = [];
      for (i = 0; i < rawData.length; i++) {
        temp.push(rawData[i].innerText);
      }

      let numRound = (tlb.getElementsByTagName("tr").length - 1) / 2;
      let tempsum = [];
      const base_offset = 18;
      for (i = 0; i < numRound; i++) {
        tempsum.push({
          win: {
            name: temp[0 + base_offset * i].trim(),

            //   sigStrikes: temp[2].trim(),
            sigStrikesLanded: parseInt(
              temp[2 + base_offset * i].trim().split("of")[0]
            ),
            sigStrikesAttempted: parseInt(
              temp[2 + base_offset * i].trim().split("of")[1]
            ),
            sigStrikesPer: parseInt(temp[4 + base_offset * i].trim()),

            //   head: temp[6].trim(),
            headStrLanded: parseInt(
              temp[6 + base_offset * i].trim().split("of")[0]
            ),
            headStrAttempted: parseInt(
              temp[6 + base_offset * i].trim().split("of")[1]
            ),

            //   body: temp[8].trim(),
            bodyStrLanded: parseInt(
              temp[8 + base_offset * i].trim().split("of")[0]
            ),
            bodyStrAttempted: parseInt(
              temp[8 + base_offset * i].trim().split("of")[1]
            ),

            //   leg: temp[10].trim(),
            legStrLanded: parseInt(
              temp[10 + base_offset * i].trim().split("of")[0]
            ),
            legStrAttempted: parseInt(
              temp[10 + base_offset * i].trim().split("of")[1]
            ),

            //   distance: temp[12].trim(),
            distanceStrLanded: parseInt(
              temp[12 + base_offset * i].trim().split("of")[0]
            ),
            distanceStrAttempted: parseInt(
              temp[12 + base_offset * i].trim().split("of")[1]
            ),

            //   clinch: temp[14].trim(),
            clinchStrLanded: parseInt(
              temp[14 + base_offset * i].trim().split("of")[0]
            ),
            clinchStrAttempted: parseInt(
              temp[14 + base_offset * i].trim().split("of")[1]
            ),

            //   ground: temp[16].trim(),
            groundStrLanded: parseInt(
              temp[16 + base_offset * i].trim().split("of")[0]
            ),
            groundStrAttempted: parseInt(
              temp[16 + base_offset * i].trim().split("of")[1]
            ),
          },
          lost: {
            name: temp[1 + base_offset * i].trim(),

            //   sigStrikes: temp[2].trim(),
            sigStrikesLanded: parseInt(
              temp[3 + base_offset * i].trim().split("of")[0]
            ),
            sigStrikesAttempted: parseInt(
              temp[3 + base_offset * i].trim().split("of")[1]
            ),
            sigStrikesPer: parseInt(temp[5 + base_offset * i].trim()),

            //   head: temp[6].trim(),
            headStrLanded: parseInt(
              temp[7 + base_offset * i].trim().split("of")[0]
            ),
            headStrAttempted: parseInt(
              temp[7 + base_offset * i].trim().split("of")[1]
            ),

            //   body: temp[8].trim(),
            bodyStrLanded: parseInt(
              temp[9 + base_offset * i].trim().split("of")[0]
            ),
            bodyStrAttempted: parseInt(
              temp[9 + base_offset * i].trim().split("of")[1]
            ),

            //   leg: temp[10].trim(),
            legStrLanded: parseInt(
              temp[11 + base_offset * i].trim().split("of")[0]
            ),
            legStrAttempted: parseInt(
              temp[11 + base_offset * i].trim().split("of")[1]
            ),

            //   distance: temp[12].trim(),
            distanceStrLanded: parseInt(
              temp[13 + base_offset * i].trim().split("of")[0]
            ),
            distanceStrAttempted: parseInt(
              temp[13 + base_offset * i].trim().split("of")[1]
            ),

            //   clinch: temp[14].trim(),
            clinchStrLanded: parseInt(
              temp[15 + base_offset * i].trim().split("of")[0]
            ),
            clinchStrAttempted: parseInt(
              temp[15 + base_offset * i].trim().split("of")[1]
            ),

            //   ground: temp[16].trim(),
            groundStrLanded: parseInt(
              temp[17 + base_offset * i].trim().split("of")[0]
            ),
            groundStrAttempted: parseInt(
              temp[17 + base_offset * i].trim().split("of")[1]
            ),
          },
        });
      }

      let summaries = {};
      for (i = 0; i < tempsum.length; i++) {
        summaries[i + 1] = tempsum[i];
      }

      return summaries;
    };
  });
}

async function getTotalFightStats(page) {
  const fsum = await page.evaluate(() => {
    let tlb = Array.from(document.querySelectorAll("table"))[0];
    return getSummaryData(tlb);
  });
  return fsum;
}

async function getRoundSummary(page) {
  const rsum = await page.evaluate(() => {
    let tlb = Array.from(document.querySelectorAll("table"))[1];
    return getRoundSummaryData(tlb);
  });
  return rsum;
}

async function getSigStrikes(page) {
  const sig = await page.evaluate(() => {
    let tlb = Array.from(document.querySelectorAll("table"))[2];
    return getSigStrikesData(tlb);
  });
  return sig;
}

async function getRoundStriking(page) {
  const rsig = await page.evaluate(() => {
    let tlb = Array.from(document.querySelectorAll("table"))[3];
    return getRoundStrikingData(tlb);
  });
  return rsig;
}

async function getFightSummary(page) {
  const sum = await page.evaluate(() => {
    let data = document.querySelectorAll(".b-fight-details__text");
    let sum = {
      fight_detail: data[0].innerText,
      finishing: data[1].innerText,
    };
    return sum;
  });
  return sum;
}

module.exports.setup = setup;
module.exports.getTotalFightStats = getTotalFightStats;
module.exports.getRoundSummary = getRoundSummary;
module.exports.getSigStrikes = getSigStrikes;
module.exports.getRoundStriking = getRoundStriking;
module.exports.getFightSummary = getFightSummary;
