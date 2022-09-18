exports.run = (client, message) => {
	client.distube.voices.leave(message)
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'leave',
	category: 'Music',
	description: 'Leave...',
	usage: 'leave',
};