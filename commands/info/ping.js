exports.run = (client, message) => {
	message.channel.send('Pong!');
};

exports.conf = {
	enabled: true,
	aliases: ['ping'],
};

exports.help = {
	name: 'ping',
	category: 'Info',
	description: 'Give a Pong, just a Pong',
	usage: 'ping',
};
