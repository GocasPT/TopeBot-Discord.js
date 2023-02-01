exports.run = (client, message) => {
	const queue = client.distube.getQueue(message);
	if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
	queue.stop();
	message.channel.send(`${client.emotes.success} | Stopped!`);
};

exports.conf = { enabled: true, aliases: ['stop'] };

exports.help = {
	name: 'stop',
	category: 'Music',
	description: 'Stop the queue',
	usage: 'stop',
};
