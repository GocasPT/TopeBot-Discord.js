exports.run = (client, message, args) => {
	const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      position: 1
    })
};

exports.conf = {
	enabled: true,
	aliases: ['playnext', 'next', 'pn'],
};

exports.help = {
	name: 'playnext',
	category: 'Music',
	description: 'Add song to play next, ignoring the queue',
	usage: 'playnext',
};