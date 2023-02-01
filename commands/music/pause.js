exports.run = (client, message) => {
	const queue = client.distube.getQueue(message);
	if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
	if (queue.paused) {
		queue.resume();
		return message.channel.send('Resumed the song for you :)');
	}
	queue.pause();
	message.channel.send('Paused the song for you :)');
};

exports.conf = { enabled: true, aliases: ['pause'] };

exports.help = {
	name: 'pause',
	category: 'Music',
	description: 'Pause the song',
	usage: 'pause',
};
