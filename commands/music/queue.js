const { EmbedBuilder, hyperlink } = require('discord.js');

exports.run = (client, message) => {
	let queueList = "";
	const queueuEmbed = new EmbedBuilder()
		.setColor('0xfaff67')
		.setTitle('Song Queue')
		.setFooter({ text: `${new Date().toLocaleDateString()}` })

	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    queue.songs.forEach((song, i) => {
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
	})

	message.channel.send({ embeds: [queueuEmbed] })
};

exports.conf = {
	enabled: true,
	aliases: ['q'],
};

exports.help = {
	name: 'queue',
	category: 'Music',
	description: 'Queueu...',
	usage: 'queue',
};