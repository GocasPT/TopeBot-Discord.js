/*const { Client, Collection, Intents } = require('discord.js');
const fs = require("fs");
const { token, prefix } = require('./config.json');

const client = new Client({ 
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const eventName = file.split(".")[0];
	const event = require(`./events/${file}`);

	client.on(eventName, event.bind(null, client));
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const commandName = file.split(".")[0];
	const command = require(`./commands/${file}`);

	console.log(`Attempting to load command ${commandName}`);
	client.commands.set(commandName, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	const command = client.commands.get(interaction.commandName);

	if (!command){
		interaction.reply("Não existe esse comando")
		return
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);*/

const { Client, Collection, Intents} = require('discord.js');
const { bgBlue, bgYellow, bgGreen } = require("colorette");
const { readdirSync } = require("fs");
const { token } = require("./config.json")
const logger = require("./modules/Logger.js");

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
			logger.log(`Loading ${bgYellow('Slash command')}: ${props.commandData.name}`, "log");
			
			client.container.slashcmds.set(props.commandData.name, props);
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