const { Client, Collection, Intents} = require('discord.js');
const { bgBlue, bgYellow, bgGreen } = require("colorette");
const { readdirSync } = require("fs");
const { token } = require("./config.json")
const logger = require("./modules/logger.js");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	partials: ["CHANNEL"],
});


const commands = new Collection();
const aliases = new Collection();
const slashcmds = new Collection();

client.container = {
	commands,
	aliases,
	slashcmds
};

const init = async () => {
	//Search a load the commands
	readdirSync("./commands/").map(async dir => {
        const commands = readdirSync(`./commands/${dir}/`).map(async cmd=> {
            let props = require(`./commands/${dir}/${cmd}`)
            logger.log(`Loading ${bgBlue('Command')}: ${props.help.name}`, "log");
			client.container.commands.set(props.help.name, props);

			props.conf.aliases.forEach(alias => {
				client.container.aliases.set(alias, props.help.name);
			});
        })
    })

	//Search a load the slash commands
	readdirSync("./slash").map(async dir => {
        const slashFiles = readdirSync(`./slash/${dir}/`).map(async cmd=> {
            let props = require(`./slash/${dir}/${cmd}`)
			logger.log(`Loading ${bgYellow('Slash command')}: ${props.name}`, "log");
			
			client.container.slashcmds.set(props.name, props);
        })
    })

	//Search a load the events
	const load = dirs => {
		const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith("js") );
		for (let file of events) {
			let event = require(`./events/${dirs}/${file}`);
			let eventName = file.split('.')[0];~
			logger.log(`Loading ${bgGreen('Event')}: ${eventName}`, "log");

			client.on(eventName, event.bind(null,client));
		}
	};
	["client", "guild"].forEach((x) => load(x));

	client.login(token);
}

init();