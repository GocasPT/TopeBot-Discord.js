module.exports = async (client, status, queue, song) => {
	queue.textChannel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.username}`
      )
};