exports.run = async (client, message) => {
	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.shuffle()
    message.channel.send('Shuffled songs in the queue')
};

exports.conf = {
	enabled: true,
	aliases: ['shuffle'],
};

exports.help = {
	name: 'shuffle',
	category: 'Music',
	description: 'Shuffle the queue',
	usage: 'shuffle',
};