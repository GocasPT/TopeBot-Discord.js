exports.run = (client, message, args) => {
	const queue = client.distube.getQueue(message);
	if (!queue)
		return message.channel.send(
			`${client.emotes.error} | There is nothing in the queue right now!`
		);
	if (!args[0]) {
		return message.channel.send(
			`${client.emotes.error} | Please provide position (in seconds) to seek!`
		);
	}
	const time = Number(args[0]);
	if (isNaN(time))
		return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
	queue.seek(time);
	message.channel.send(`Seeked to ${time}!`);
};

exports.conf = {
	enabled: true,
	aliases: ['seek'],
};

exports.help = {
	name: 'seek',
	category: 'Music',
	description: 'Jump to the timew set the song',
	usage: 'seek',
};
