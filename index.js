const puppeteer = require("puppeteer");
const cheerio = require("cheerio");


let currentVal = 0;
async function loadPages() {
    try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    // Set timeout limit to 0.
    await page.setDefaultNavigationTimeout(0);

    //Request request interception.
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if (req.resourceType() === 'image') {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.goto(process.env.SITE);
    
    //Screenshots the page
    //await page.screenshot({ path: "image.png"});

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML
        }
    });


    //Array.from takes 2 parameters (object to convert to an array, map function call to element in array).
    const products = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.product-card-title'), element => element.textContent));
    

    // Gets all html from the site.
   // console.log(pageData);

    const $ = cheerio.load(pageData.html);

    const element = $(".product-count");
    const productColumns = $(".column");

    console.log("length: " + productColumns.length);
    
    let priceArray = [];

     for  (let i  = 0; i < productColumns.length; i++) {
         let allReducedPrices = $(productColumns[i]).find(".price-row")[0],
         // Algorithm if you want to remove the second occurence of a character.
         // split function on string with substring you want to remove as seperator.
         // Followed by the limit "2", this will split only two elements into an array.
         // Join function on array as the first occurence will not be inserted back. 
         reducedPricesText = ($(allReducedPrices).text()).split("$", 2).join("$");

        // finalAllReducedPrices will now store all the reduced prices for the products.
         finalAllReducedPrices = reducedPricesText.split("Reduced: ").join("");

         //push prices into priceArray array.

         priceArray.push(finalAllReducedPrices);
         
     }

     console.log("Array Length: " + priceArray.length);


    console.log(element.text());

 
    //console.log(productTitle.text());

    currentVal = element.text();

    //console.log(currentVal);

    await browser.close();

    console.log("Current Value: " + currentVal);

    return currentVal;

    }

    catch(error) {
        return "Products not found";
    }

}

async function productNames(productArray) {
    for(var index in productArray) {
        console.log(productArray[index]);
    }
}
module.exports = {loadPages};
// Two variables to be used in index.js
// Set as setInterval() funcation call.
module.exports.timedCheck = undefined;
// Tracks number of iterations to run code until stopping.
module.exports.val = 0;
//loadPages();


