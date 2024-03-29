exports.run = (client, message, args) => {
	const queue = client.distube.getQueue(message);
	if (!queue)
		return message.channel.send(
			`${client.emotes.error} | There is nothing in the queue right now!`
		);
	if (!args[0]) {
		return message.channel.send(
			`${client.emotes.error} | Please provide time (in seconds) to go forward!`
		);
	}
	const time = Number(args[0]);
	if (isNaN(time))
		return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
	queue.seek(queue.currentTime + time);
	message.channel.send(`Forwarded the song for ${time}!`);
};

exports.conf = {
	enabled: true,
	aliases: ['forward', 'fw'],
};

exports.help = {
	name: 'forward',
	category: 'Music',
	description: 'Forward, in seconds, on the song now playing',
	usage: 'forward',
};
