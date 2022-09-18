exports.run = (client, message) => {
	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
	queue.previous()
    message.channel.send(`${client.emotes.success} | Now previous music...`)
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'previous',
	category: 'Music',
	description: 'Previous...',
	usage: 'previous',
};