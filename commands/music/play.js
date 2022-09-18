exports.run = (client, message, args) => {
	const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
};

exports.conf = {
	enabled: true,
	aliases: ['p'],
};

exports.help = {
	name: 'play',
	category: 'Music',
	description: 'Play...',
	usage: 'play',
};