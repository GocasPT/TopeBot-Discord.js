const { EmbedBuilder, hyperlink } = require('discord.js');

function generateQueueEmbed(queue) {
	const embedList = [];

	for (let i = 0; i < queue.songs.length; i += 10) {
		const current = queue.songs.slice(i, i + 10);
		const info = current
			.map((track, j) => `${i + j + 1} - ${hyperlink(track.name, track.url)} [\`${track.formattedDuration}\`]`)
			.join('\n');
		const embed = new EmbedBuilder()
			.setColor('0xfaff67')
			.setTitle('Song Queue')
			.setFooter({ text: `${new Date().toLocaleDateString()}` })
			.setDescription(`**Current Song - ${hyperlink(queue.songs[0].name, queue.songs[0].url)}**\n${info}`);

		embedList.push(embed);
	}

	return embedList;
}

exports.run = async (client, message) => {
	const queue = client.distube.getQueue(message);

	if (!queue) return message.channel.send("I don't have a queue...");

	const queueEmbeds = generateQueueEmbed(queue);
	let currentPage = 0;
	const queueMessage = await message.channel.send({
		content: `Current Page: ${currentPage + 1}/${queueEmbeds.length}\n`,
		embeds: [queueEmbeds[currentPage]],
	});

	await queueMessage.react('⬅️');
	await queueMessage.react('➡️');

	const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
	const collector = queueMessage.createReactionCollector({
		filter,
		time: 60_000,
	});

	collector.on('collect', async (reaction, user) => {
		const userReactions = queueMessage.reactions.cache.filter((reaction) => reaction.users.cache.has(user.id));
		collector.resetTimer({ time: 60_000 });

		if (reaction.emoji.name === '➡️') {
			if (currentPage < queueEmbeds.length - 1) {
				currentPage++;
				queueMessage.edit({
					content: `Current Page: ${currentPage + 1}/${queueEmbeds.length}`,
					embeds: [queueEmbeds[currentPage]],
				});
			}
		} else if (currentPage !== 0) {
			currentPage--;
			queueMessage.edit({
				content: `Current Page: ${currentPage + 1}/${queueEmbeds.length}`,
				embeds: [queueEmbeds[currentPage]],
			});
		}

		try {
			for (const reaction of userReactions.values()) {
				await reaction.users.remove(user.id);
			}
		} catch (error) {
			console.error('Failed to remove reactions.');
		}
	});

	collector.on('end', () => {
		queueMessage.reactions.removeAll();
	});
};

exports.conf = { enabled: true, aliases: ['queue', 'q'] };

exports.help = {
	name: 'queue',
	category: 'Music',
	description: 'Show the queue in pages',
	usage: 'queue',
};
