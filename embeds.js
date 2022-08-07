const { MessageEmbed } = require('discord.js')


const productCountEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.addFields(
		{ name: 'Fanatics', value: '[Link](https://www.fanatics.com/mlb/hats-fitted-sale-items/o-3409+d-19772242-75445340+os-4+z-9-3556458608)', inline: true },
		{ name: 'Fansedge', value: '[Link](https://www.fansedge.com/en/mlb-hats-fitted-sale-items/o-4510+d-3472148327-56835899+os-4+z-9-1676315066)', inline: true },
		{ name: 'MLB Shop', value: '[Link](https://www.mlbshop.com/caps-fitted-sale-items/d-3472996692-9005338232+os-4+z-9-1770578515)', inline: true },

	)
	.setTimestamp()
	.setFooter({ text: 'On Sale Monitor' });

const productsEmbed = new MessageEmbed()
    .setColor('#AFE1AF')
    .setTimestamp()
    .setFooter({text: 'On Sale Monitor'});


    module.exports.productCountEmbed = productCountEmbed;
    module.exports.productsEmbed = productsEmbed;