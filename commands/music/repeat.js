exports.run = (client, message, args) => {
	const queue = client.distube.getQueue(message);
	if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`);
	let mode = null;
	switch (args[0]) {
		case 'off':
			mode = 0;
			break;
		case 'song':
			mode = 1;
			break;
		case 'queue':
			mode = 2;
			break;
		default:
			mode = 1;
			break;
	}
	mode = queue.setRepeatMode(mode);
	mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off';
	message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``);
};

exports.conf = {
	enabled: true,
	aliases: ['repeat', 'loop', 'l'],
};

exports.help = {
	name: 'repeat',
	category: 'Music',
	description: 'Repeat the song or queue in loop',
	usage: 'repeat',
};
