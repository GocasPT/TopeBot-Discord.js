const logger = require('../../modules/logger.js');
const config = require('../../config.json');

module.exports = async (client) => {
	logger.log(
		`${client.user.tag}, ready to serve ${client.guilds.cache
			.map((g) => g.memberCount)
			.reduce((a, b) => a + b)} users in ${client.guilds.cache.size} servers.`,
		'ready'
	);

	client.user.setActivity(`${config.prefix}help, olhem que os exames estão à porta e vocês precissão da minha ajuda`, {
		type: 'PLAYING',
	});
};
