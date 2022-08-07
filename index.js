const puppeteer = require("puppeteer");
const cheerio = require("cheerio");


let currentVal = 0;
async function loadPages() {
    const browser = await puppeteer.launch();
    try {
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
    const totalProducts = $(".product-count");
    const productColumns = $(".column");
    console.log("length: " + productColumns.length);
    let priceArray = [];
    let imageURLArray = [];
    let productURLArray = [];
    for  (let i  = 0; i < productColumns.length; i++) {
         let allReducedPrices = $(productColumns[i]).find(".price-row")[0];
         // Get src value from image element to get image URL.
         let imageLink = $(productColumns[i]).find('img').attr('src');
         imageLink = "https:" + imageLink;
         console.log(imageLink);
         //Issue: some images are encoded in base64, if this is the case we need a default image.
         imageURLArray.push(imageLink);

         let productLink = $(productColumns[i]).find('a').attr('href');
         productLink = "https://fanatics.com" + productLink;
         productURLArray.push(productLink);
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

let finalProductsArray = [];

finalProductsArray.push(totalProducts.text());

     for (let x in products) {
        let theName = products[x];
        let thePrice = priceArray[x];
        let theImage = imageURLArray[x];
        let theURL = productURLArray[x];

        const productObj = {
            name: theName,
            price: thePrice,
            image: theImage,
            URL: theURL
        }
        finalProductsArray.push(productObj);
     }


    //  console.log(finalProductsArray);
    //console.log(productTitle.text());
    currentVal = totalProducts.text();
    //console.log(currentVal);
    console.log("Current Value: " + currentVal);

    return finalProductsArray;

    }

    catch(error) {
        return "Products not found";
    }

    finally {
        await browser.close();
        console.log("Closed puppeteer browser");

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


