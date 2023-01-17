const { EmbedBuilder, hyperlink } = require('discord.js');

function generateQueueEmbed(queue){
	const embedList = [];
	for(let i = 0; i < queue.songs.length; i += 10){
		const current = queue.songs.slice(i, i + 10);
		let j = i;
		const info = current.map(track => `${j + 1} - ${hyperlink(track.name, track.url)} [\`${track.formattedDuration}\`]\n`)
		const embed = new EmbedBuilder()
			.setColor('0xfaff67')
			.setTitle('Song Queue')
			.setFooter({ text: `${new Date().toLocaleDateString()}` })
			.setDescription(`**Current Song - ${hyperlink(queue.songs[0].name, queue.songs[0].url)}**\n${info}`);

		embedList.push(embed)
	}
	return embedList;
}

exports.run = async(client, message) => {
	let currentPage = 0;
	const queue = client.distube.getQueue(message);
	const embeds = generateQueueEmbed(queue);

	const messageEmbed = message.channel.send(`Current Page: ${currentPage + 1}/${embeds.length}`);
	const queueEmbedMessage = await message.channel.send({ embeds: [embeds[currentPage]] });
	queueEmbedMessage.react('⬅️').then(() => queueEmbedMessage.react('➡️'))

	// Wait for the user to react
	const filter = (reaction, user) => {
		return ['⬅️', '➡️'].includes(reaction.emoji.name);
	}

	await queueEmbedMessage.awaitReactions({ filter, max: 1, time: 5000}).then(collected => {
			const reaction = collected.first();
			console.log(collected);

			// Handle pagination
			if (reaction.emoji.name === '➡️') {
				console.log("1\n");
				if(currentPage < embeds.length - 1){
					currentPage++;
					messageEmbed.edit(`Current Page: ${currentPage + 1}/${embeds.length}`);
					queueEmbedMessage.edit({ embeds: [embeds[currentPage]] });
				}
			} else {
				console.log("2\n");
				if(currentPage !== 0){
					currentPage--;
					queueEmbedMessage.edit(`Current Page: ${currentPage+1}/${embeds.length}`, { embed: embeds[currentPage] });
				}
			}
		});
};

exports.conf = {
	enabled: true,
	aliases: ['queue', 'q'],
};

exports.help = {
	name: 'queue',
	category: 'Music',
	description: 'Show the queue in pages',
	usage: 'queue',
};
