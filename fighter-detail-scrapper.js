const fight_detail = require('./fight-detail-scrapper');

async function setup(page) {
    const table = ".js-fight-details-click";
    await page.waitForSelector(table);
}

async function getFightURLs(page) {
    const urls = await page.evaluate( () => {
        let data = document.querySelectorAll(".js-fight-details-click");
        let urls = []
        for (i = 0; i < data.length; i++) {
            let rawurl = data[i].getAttribute("onClick");
            urls.push(rawurl.match(/http:\/\/.*\/\w*/)[0]);
        }
        return urls;
    });
    return urls;
}

async function extractDatafromFights(urls,page) {

    // Visit each page one by one
    for (let url of urls) {

        // open the page
        try {
            await page.goto(url, {
                waitUntil : "networkidle2"
            });
            console.log('opened the page: ', url);
        } catch (error) {
            console.log(error);
            console.log('failed to open the page: ', url);
        }

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

        console.log("---------------------------------------------");

        

    }

}

module.exports.setup = setup;
module.exports.getFightURLs = getFightURLs;
module.exports.extractDatafromFights = extractDatafromFights;
