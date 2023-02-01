module.exports = async (client, status, queue, playlist) => {
	queue.textChannel.send(
		`${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue
        ${status(queue)}`
	);
};
