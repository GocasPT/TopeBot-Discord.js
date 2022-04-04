const { getDir, numberGenerator } = require('../../modules/functions')
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'quote',
	description: "Random quote from tope",
	category: 'fun',
	run: async (client, interaction) => {
		await interaction.reply('Searching a quote...');

		let quotesDir = '/ImageLibary/Quotes';
		let listQuote = [];

		getDir(quotesDir, listQuote);
		
		setTimeout(() => {
			const i = numberGenerator(0, listQuote.length-1);
			const attachment = new MessageAttachment(`${listQuote[i]}`);
			
			interaction.editReply('Quote:', { files: [attachment] });
			interaction.followUp({ files: [attachment] });
		}, 50);
	},
}