const { ActionRowBuilder, SelectMenuBuilder } = require('@discordjs/builders');

let filtersList = '';

exports.run = async (client, message, args) => {
	const queue = client.distube.getQueue(message);
	if (!queue)
		return message.channel.send(
			`${client.emotes.error} | There is nothing in the queue right now!`
		);

	if (!args[0]) {
		const menu = new SelectMenuBuilder()
			.setCustomId('select')
			.setPlaceholder('Nothing selected')
			.setMaxValues(1);

		for (const filter in client.distube.filters) {
			filtersList += `→${filter}\n`;
			menu.addOptions({
				label: filter,
				description: 'This is a description',
				value: `${filter}`,
			});
		}

		const row = new ActionRowBuilder().addComponents(menu);

		await message.reply({ content: 'Filters:', components: [row] });
	} else {
		const filter = args[0];

		if (filter === 'off' && queue.filters.size) queue.filters.clear();
		else if (Object.keys(client.distube.filters).includes(filter)) {
			if (queue.filters.has(filter)) queue.filters.remove(filter);
			else queue.filters.add(filter);
		} else if (args[0]) return message.channel.send(`${client.emotes.error} | Not a valid filter`);

		message.channel.send(`Current Queue Filter: \`${queue.filters.names.join(', ') || 'Off'}\``);
	}

	client.on('interactionCreate', (interaction) => {
		if (!interaction.isSelectMenu()) return;

		const selected = interaction.values[0];

		console.log(Object.keys(client.distube.filters));
		console.log(selected);

		if (selected === 'off' && queue.filters.size) queue.filters.clear();
		else if (Object.keys(client.distube.filters).includes(selected)) {
			if (queue.filters.has(selected)) queue.filters.remove(selected);
			else queue.filters.add(selected);
		}

		interaction.reply(`Current Queue Filter: \`${queue.filters.names.join(', ') || 'Off'}\``);
	});
};

exports.conf = { enabled: true, aliases: ['filters', 'filter'] };

exports.help = {
	name: 'filters',
	category: 'Music',
	description: `Add or remove filters\nList:\n${filtersList}`,
	usage: 'filters',
};
