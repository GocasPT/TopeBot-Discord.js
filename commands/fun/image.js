const { getDir, numberGenerator } = require('../../modules/functions');
const { AttachmentBuilder } = require('discord.js');

exports.run = async (client, message) => {
	const msg = await message.reply('Searching a image...');

	const topeDir = '/ImageLibary/Tope';
	const listTope = [];

	getDir(topeDir, listTope);

	setTimeout(() => {
		const i = numberGenerator(0, listTope.length - 1);
		const attachment = new AttachmentBuilder(`${listTope[i]}`);

		msg.delete();

		message.channel.send({ files: [attachment] });
	}, 50);
};

exports.conf = {
	enabled: true,
	aliases: ['imagem'],
};

exports.help = {
	name: 'image',
	category: 'Fun',
	description: 'Random image from tope',
	usage: 'image',
};