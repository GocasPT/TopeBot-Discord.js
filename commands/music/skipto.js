exports.run = async (client, message, args) => {
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
	const num = Number(args[0]);
	if (isNaN(num))
		return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
	await client.distube.jump(message, num).then((song) => {
		message.channel.send({ content: `Skipped to: ${song.name}` });
	});
};

exports.conf = {
	enabled: true,
	aliases: ['skipto'],
};

exports.help = {
	name: 'skipto',
	category: 'Music',
	description: 'Skip to the number of song you want',
	usage: 'skipto',
};
