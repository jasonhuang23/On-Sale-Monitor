const Discord = require('discord.js')
require("dotenv").config()
//const bot = new Discord.Client();
const lib = require("./index")




const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})


client.on('ready', () =>{
    console.log("This bot is online")
})

const result = lib.loadPages();


client.login(process.env.TOKEN)


// Get current value of products and store in variable result.
// Call loadPages() function again.
// Store result in another variable (newResult)
// Call this function again and again until curentVal is greater than newResult.

//console.log(result);
