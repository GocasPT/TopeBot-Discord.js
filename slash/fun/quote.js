const { MessageAttachment } = require('discord.js');
const { getDir, numberGenerator } = require('../../modules/functions');

module.exports = {
	name: 'quote',
	description: 'Random quote from tope',
	category: 'fun',
	run: async (client, interaction) => {
		await interaction.reply('Searching a quote...');

		const quotesDir = '/ImageLibary/Quotes';
		const listQuote = [];

		getDir(quotesDir, listQuote);

		setTimeout(() => {
			const i = numberGenerator(0, listQuote.length - 1);
			const attachment = new MessageAttachment(`${listQuote[i]}`);

			interaction.editReply('Quote:', { files: [attachment] });
			interaction.followUp({ files: [attachment] });
		}, 50);
	},
};
