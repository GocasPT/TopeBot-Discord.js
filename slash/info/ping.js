const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Get bot speed',
	category: 'info',
	run: async (client, interaction) => {
		await interaction.reply('🏓 Pong!');
		const msg = await interaction.fetchReply();
		const embed = new Discord.MessageEmbed()
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor('RANDOM')
			.setTimestamp()
			.setDescription(
				`**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${
					client.ws.ping
				} ms`
			);
		interaction.editReply({
			embeds: [embed],
			content: `<@${interaction.user.id}>`,
		});
	},
};
