const puppeteer = require("puppeteer");
const cheerio = require("cheerio");


let currentVal = 0;


async function loadPages() {
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

    await page.goto("https://www.fanatics.com/mlb/hats-fitted-sale-items/o-3409+d-19772242-75445340+os-4+z-9-3556458608");
    //https://www.fanatics.com/mlb/hats-fitted-sale-items/o-3409+d-19772242-75445340+os-4+z-9-3556458608
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

    const moneyVal = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.sr-only'), element => element.textContent));


        //console.log(testText[0]);
    //await productSalePrice(moneyVal);
    //await productNames(products);

    //console.log(testEval.text());
    

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
         

        //  splitReducedPricestext = reducedPricesText.split(" ");
         
         
         console.log("Final Reduced Price: " + finalAllReducedPrices);
         //console.log("Only Price: " + onlyPrice);
     }

     console.log(priceArray.length);

 
  
    //const productTitle = $(".product-card-title");
    //const lowestPrice = $(".lowest");

    console.log(element.text());

 
    //console.log(productTitle.text());

    currentVal = element.text();

    //console.log(currentVal);

    await browser.close();



}

async function productNames(productArray) {
    for(var index in productArray) {
        console.log(productArray[index]);
    }
}

async function productSalePrice(priceArray) {
    for(var index in priceArray) {
        if (index % 2 == 0) {
            // finalPriceArray.push(priceArray[index]);
            console.log(priceArray[index]);
        }
        // console.log(finalPriceArray[index]);
    }
}
module.exports = {loadPages};
//loadPages();


