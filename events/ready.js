module.exports = (client, message) => {
		console.log(`\nReady! Logged in as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
};