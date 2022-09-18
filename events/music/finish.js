module.exports = async (client, status, queue) => {
	queue.textChannel.send(`${client.emotes.error}Finished!`)
};