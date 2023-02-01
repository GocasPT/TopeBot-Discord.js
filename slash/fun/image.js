// const path = require('path');
// const fs = require('fs');
const { MessageAttachment } = require('discord.js');
const { getDir, numberGenerator } = require('../../modules/functions');

module.exports = {
	name: 'image',
	description: 'Get bot speed',
	category: 'fun',
	run: async (client, interaction) => {
		await interaction.reply('Searching a image...');

		const topeDir = '/ImageLibary/Tope';
		const listTope = [];

		getDir(topeDir, listTope);

		setTimeout(() => {
			const i = numberGenerator(0, listTope.length - 1);
			const attachment = new MessageAttachment(`${listTope[i]}`);

			// interaction.delete();
			interaction.followUp({ files: [attachment] });
		}, 50);
	},
};
