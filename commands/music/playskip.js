exports.run = (client, message, args) => {
	const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    })
};

exports.conf = {
	enabled: true,
	aliases: ['ps'],
};

exports.help = {
	name: 'playskip',
	category: 'Music',
	description: 'Play skip...',
	usage: 'playskip',
};