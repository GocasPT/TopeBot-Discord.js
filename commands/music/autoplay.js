exports.run = (client, message) => {
	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
};

exports.conf = {
	enabled: true,
	aliases: ['autuplay', 'auto'],
};

exports.help = {
	name: 'autoplay',
	category: 'Music',
	description: 'Toggle the Autoplay mode. Autoplay mode is whene the song end, is add a new play on the queue base on previous',
	usage: 'autoplay',
};