const { Client, Collection, Intents } = require('discord.js');
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

client.login(token);