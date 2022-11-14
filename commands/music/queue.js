const { EmbedBuilder, hyperlink } = require('discord.js');

function generateQueueEmbed(queue){
	const embeds = [];
	let k = 10;
	for(let i = 0; i < queue.length; i += 10){
		const current = queue.slice(i, k);
		let j = i;
		k += 10;
		const info = current.map(track => `${j} - ${hyperlink(track.name, track.url)} [\`${track.formattedDuration}\`]\n`)
		const embed = new EmbedBuilder()
			.setDescription(`**Current Song - ${hyperlink(queue[0].name, queue[0].url)}**\n${info}`)
		embeds.push(embed)
	}
	return embeds;
}

exports.run = (client, message) => {
	//let queueList = "";
	const queueuEmbed = new EmbedBuilder()
		.setColor('0xfaff67')
		.setTitle('Song Queue')
		.setFooter({ text: `${new Date().toLocaleDateString()}` })

	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    /* queue.songs.forEach((song, i) => {
		if (i==0) {
			queueuEmbed.setDescription(`**Current Song - ${hyperlink(song.name, song.url)}**`)
		}
		else {
				queueList = queueList + `${i} - ${hyperlink(song.name, song.url)} [\`${song.formattedDuration}\`]\n`
		}
	});

	if (queue.autoplay) queueList = "Modo: *autoplay*"
	else if (queueList === "") queueList = "Nada";

	queueuEmbed.addFields({
		name: '\u200B',
		value: `${queueList}`
	}) */

	let currentPage = 0;
	const embeds = generateQueueEmbed(queue);
	const queueEmbed = message.channel.send(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
	queueEmbed.react('⬅️');
	queueEmbed.react('➡️');

	const filter = (reaction, user) => {
		return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === user.id;
	}

	message.awaitReactions({ filter, max: 1 })
		.then(collected => {
			const reaction = collected.first();

			if (reaction.emoji.name === '➡️') {
				if(currentPage < embeds.length-1){
					currentPage++
					queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage])
				}
			} else {
				if(currentPage !== 0){
					--currentPage
					queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage])
				}
			}
		})


	message.channel.send({ embeds: [queueuEmbed] })
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