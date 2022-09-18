exports.run = (client, message) => {
	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'autoplay',
	category: 'Music',
	description: 'Auto play...',
	usage: 'autoplay',
};