const { AttachmentBuilder } = require('discord.js');
const { getDir, numberGenerator } = require('../../modules/functions');

exports.run = async (client, message) => {
	const msg = await message.reply('Searching a quote...');

	const quotesDir = '/ImageLibary/Quotes';
	const listQuote = [];

	getDir(quotesDir, listQuote);

	setTimeout(() => {
		const i = numberGenerator(0, listQuote.length - 1);
		const attachment = new AttachmentBuilder(`${listQuote[i]}`);

		msg.edit('Quote:');

		message.channel.send({ files: [attachment] });
	}, 50);
};

exports.conf = { enabled: true, aliases: ['quote', 'frase'] };

exports.help = {
	name: 'quote',
	category: 'Fun',
	description: 'Random quote from tope',
	usage: 'quote',
};
