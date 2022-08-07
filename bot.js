const Discord = require('discord.js')
require("dotenv").config()
//const bot = new Discord.Client();
const lib = require("./index")
const embeds = require("./embeds")
const { MessageEmbed } = require('discord.js')



const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

const channelID=1004306394683551764;


client.on('ready', () =>{
    console.log("This bot is online")
})

client.on('messageCreate', (message) => {
if (message.channelId == channelID) {
    if (message.content == ".c") {
		// If lib.timedCheck is 'undefined'.
		if(!lib.timedCheck) {
			lib.timedCheck = setInterval(() => {
				// Store return value of loadPages() into variable named result.
				let result = lib.loadPages();
				// Variable returnVal stores loadPages() async result.
				result.then(function(returnVal) {
					// returnVal will have number of items on page.
					embeds.productCountEmbed.setTitle(returnVal[0]);
					message.reply({embeds: [embeds.productCountEmbed]});
					
						for(let x = 1; x < returnVal.length; x++) {
							embeds.productsEmbed.setTitle(returnVal[x].name);
							embeds.productsEmbed.setURL(returnVal[x].URL);
							embeds.productsEmbed.setImage(returnVal[x].image);
							embeds.productsEmbed.setDescription(returnVal[x].price);
							client.channels.cache.get('1004667422646747167').send({embeds: [embeds.productsEmbed]});
							
						}
					message.reply("Iteration #: " + lib.val);
					console.log("Running... " + lib.val++);
					valcheck();
				})
			}, 60000);
		}
//1800000 - 30 minute intervals        
    }
	// stop the bot from running.
	else if (message.content == ".s") {
		clearInterval(lib.timedCheck);
		lib.timedCheck = undefined;
		message.reply("Stopping monitor...");
	}
}

	//valcheck function used to reset timedcheck variable once number of iterations are met.
	let valcheck = () => {
		// clearInterval stops timer once number of iterations is met.
		if(lib.val > 5) {
			clearInterval(lib.timedCheck);
			// Set timedCheck back to undefined so we can run setInterval again.
			lib.timedCheck = undefined;
			lib.val = 0;
			return message.channel.send('command finished');
		}
	}


})


let test = lib.loadPages();


client.login(process.env.TOKEN)


// Get current value of products and store in variable result.
// Call loadPages() function again.
// Store result in another variable (newResult)
// Call this function again and again until curentVal is greater than newResult.

//console.log(result);
