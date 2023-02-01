module.exports = async (client, status, message, query) => {
	message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`);
};
