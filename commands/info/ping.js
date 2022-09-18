exports.run = (client, message) => {
	message.channel.send('Pong!');
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'ping',
	category: 'Info',
	description: 'Give a Pong',
	usage: 'ping',
};