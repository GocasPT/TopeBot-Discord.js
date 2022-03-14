const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const path = require('path');
const { clientId, token } = require('./config.json');

const slashs = []
readdirSync("./slash/").map(async dir => {
	readdirSync(`./slash/${dir}/`).map(async (cmd) => {
		slashs.push(require(path.join(__dirname, `./slash/${dir}/${cmd}`)));
    })
})

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
		//loading (npm)
		console.log('	Started refreshing application (/) commands');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: slashs },
		);

		console.log('	Successfully reloaded application (/) commands\n');
	} catch (error) {
		console.error(error);
	}
})();