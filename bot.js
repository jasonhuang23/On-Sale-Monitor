const Discord = require('discord.js')
require("dotenv").config()
//const bot = new Discord.Client();
const lib = require("./index")
const { MessageEmbed } = require('discord.js')

const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	//.setURL('https://discord.js.org/')
	//.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	//.setDescription('Some description here')
	// .setThumbnail('')
	.addFields(
		{ name: 'Fanatics', value: '[Link](https://www.fanatics.com/mlb/hats-fitted-sale-items/o-3409+d-19772242-75445340+os-4+z-9-3556458608)', inline: true },
		{ name: 'Fansedge', value: '[Link](https://www.fansedge.com/en/mlb-hats-fitted-sale-items/o-4510+d-3472148327-56835899+os-4+z-9-1676315066)', inline: true },
		{ name: 'MLB Shop', value: '[Link](https://www.mlbshop.com/caps-fitted-sale-items/d-3472996692-9005338232+os-4+z-9-1770578515)', inline: true },

	)
	//.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });



const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})


client.on('ready', () =>{
    console.log("This bot is online")
})

client.on('messageCreate', (message) => {
    if (message.content == ".c") {
		// If lib.timedCheck is 'undefined'.
		if(!lib.timedCheck) {
			lib.timedCheck = setInterval(() => {
				// Store return value of loadPages() into variable named result.
				let result = lib.loadPages();
				// Variable returnVal stores loadPages() async result.
				result.then(function(returnVal) {
					// returnVal will have number of items on page.
					exampleEmbed.setTitle(returnVal);
					message.reply({embeds: [exampleEmbed]});
					message.reply("Iteration #: " + lib.val);
					console.log("Running... " + lib.val++);
					valcheck();
				})
			}, 60000);
		}
//1800000 - 30 minute intervals        
    }
	// stop the bot from running.
	if (message.content == ".s") {
		clearInterval(lib.timedCheck);
		lib.timedCheck = undefined;
		message.reply("Stopping monitor...");
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


//let test = lib.loadPages();


client.login(process.env.TOKEN)


// Get current value of products and store in variable result.
// Call loadPages() function again.
// Store result in another variable (newResult)
// Call this function again and again until curentVal is greater than newResult.

//console.log(result);
