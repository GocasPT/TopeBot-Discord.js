exports.run = (client, message) => {
	client.distube.voices.leave(message);
};

exports.conf = {
	enabled: true,
	aliases: ['leave'],
};

exports.help = {
	name: 'leave',
	category: 'Music',
	description: 'Leave the voice channel where you are',
	usage: 'leave',
};
