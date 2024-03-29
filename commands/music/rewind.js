exports.run = (client, message, args) => {
	const queue = client.distube.getQueue(message);
	if (!queue)
		return message.channel.send(
			`${client.emotes.error} | There is nothing in the queue right now!`
		);
	if (!args[0]) {
		return message.channel.send(
			`${client.emotes.error} | Please provide time (in seconds) to go rewind!`
		);
	}
	const time = Number(args[0]);
	if (isNaN(time))
		return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
	queue.seek(queue.currentTime - time);
	message.channel.send(`Rewinded the song for ${time}!`);
};

exports.conf = {
	enabled: true,
	aliases: ['rewind'],
};

exports.help = {
	name: 'rewind',
	category: 'Music',
	description: 'Rewind, in seconds, the song',
	usage: 'rewind',
};
