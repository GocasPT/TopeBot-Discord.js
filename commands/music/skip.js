exports.run = async (client, message) => {
	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    try {
      const song = await queue.skip()
      message.channel.send(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
};

exports.conf = {
	enabled: true,
	aliases: ['skip', 's'],
};

exports.help = {
	name: 'skip',
	category: 'Music',
	description: 'Skip to the next song',
	usage: 'skip',
};