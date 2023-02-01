const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

exports.run = async (client, message) => {
	const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder().setCustomId('primary').setLabel('Click me!').setStyle(ButtonStyle.Primary)
	);

	await message.reply({ content: 'I think you should,', components: [row] });

	client.on('interactionCreate', (interaction) => {
		if (!interaction.isButton()) return;
		console.log('Clicado');
		message.channel.send('Clicado');
	});
};

exports.conf = { enabled: true, aliases: ['button'] };

exports.help = {
	name: 'button',
	category: 'Test',
	description: 'Test buttons',
	usage: 'button',
};
