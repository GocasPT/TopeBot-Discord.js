exports.run = (client, message) => {
	const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Resumed the song for you :)')
    } else {
      message.channel.send('The queue is not paused!')
    }
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'resume',
	category: 'Music',
	description: 'Resume...',
	usage: 'resume',
};