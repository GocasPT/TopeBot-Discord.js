module.exports = async (client, status, queue, song) => {
	queue.textChannel.send(
		`${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\` [${song.url}]
        Requested by: ${song.user.username}
        ${status(queue)}`
	);
};
