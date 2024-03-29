const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

exports.run = async (client, message) => {
	const row = new ActionRowBuilder().addComponents(
		new SelectMenuBuilder().setCustomId('select').setPlaceholder('Nothing selected').addOptions(
			{
				label: 'Select me',
				description: 'This is a description',
				value: 'first_option',
			},
			{
				label: 'You can select me too',
				description: 'This is also a description',
				value: 'second_option',
			}
		)
	);

	await message.reply({ content: 'Pong!', components: [row] });

	client.on('interactionCreate', (interaction) => {
		if (!interaction.isSelectMenu()) return;
		console.log('Menu');
		interaction.reply('Menu');
	});
};

exports.conf = {
	enabled: true,
	aliases: ['menu'],
};

exports.help = {
	name: 'menu',
	category: 'Test',
	description: 'Test select menu',
	usage: 'menu',
};
