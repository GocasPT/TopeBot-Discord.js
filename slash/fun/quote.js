const path = require('path');
const fs = require('fs');
const { numberGenerator } = require('../../modules/functions')
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'quote',
	description: "Random quote from tope",
	category: 'fun',
	run: async (client, interaction) => {
		await interaction.reply('Searching a quote...');

		let quotesFolder = path.join(__dirname, '../../modules/ImageLibary/Quotes');
		let listQuote = [];

		fs.readdir(quotesFolder, function (err, files) {
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			}

			for(quote of files){
				listQuote.push(path.join(quotesFolder, quote));
			}
		});
		
		setTimeout(() => {
			const i = numberGenerator(0, listQuote.length-1);
			const attachment = new MessageAttachment(`${listQuote[i]}`);
			
			interaction.editReply('Quote:');
			interaction.followUp({ files: [attachment] });
		}, 500);
	},
}