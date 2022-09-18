const time = new Date().toLocaleString();

module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;

	const cmd = client.container.slashcmds.get(interaction.commandName);

	if (!cmd) return;

	try {
		await cmd.run(client, interaction);

		const InteractionText = `${interaction.user.tag} in ${interaction.guild.name} channel triggered an interaction in ${time}.\n`;

		console.log(InteractionText);
	}
	catch (e) {
		console.error(e);

		if (interaction.replied) {
			interaction.followUp({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true });
			console.error('An error occurred following up on an error', e);
		}

		if (interaction.deferred) {
			interaction.editReply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true });
			console.error('An error occurred following up on an error', e);
		}

		else {
			interaction.reply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true });
			console.error('An error occurred replying on an error', e);
		}

	}
};