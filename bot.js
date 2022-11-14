const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { bgBlue, bgYellow, bgGreen, bgCyan } = require('colorette');
const { readdirSync } = require('fs');
const { token, emoji } = require('./config.json');
const logger = require('./modules/logger.js');

// Cliente Discord part
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
	],
	partials: [Partials.Channel],
});

// Set commands, slash commands and eventes on containers
const commands = new Collection();
const aliases = new Collection();
const slashcmds = new Collection();

client.emotes = emoji;
client.container = {
	commands,
	aliases,
	slashcmds,
};

// Cliente Music Part
client.distube = new DisTube(client, {
	leaveOnStop: false,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin()
	]
});

const status = queue =>
  `Volume: \`${queue.volume = 25}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

// Initialization funciotn
const init = async () => {
	// Search a load the commands
	readdirSync('./commands/').map(async dir => {
		readdirSync(`./commands/${dir}/`).map(async cmd => {
			const props = require(`./commands/${dir}/${cmd}`);
			logger.log(`Loading ${bgBlue('Command')}: ${props.help.name}`, 'log');
			client.container.commands.set(props.help.name, props);

			props.conf.aliases.forEach(alias => {
				client.container.aliases.set(alias, props.help.name);
			});
		});
	});

	// Search a load the slash commands
	readdirSync('./slash').map(async dir => {
		readdirSync(`./slash/${dir}/`).map(async cmd => {
			const props = require(`./slash/${dir}/${cmd}`);
			logger.log(`Loading ${bgYellow('Slash command')}: ${props.name}`, 'log');

			client.container.slashcmds.set(props.name, props);
		});
	});

	// Search the discord's events
	const loadEvent = dirs => {
		const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('js'));
		for (const file of events) {
			const event = require(`./events/${dirs}/${file}`);
			const eventName = file.split('.')[0];
			logger.log(`Loading ${bgGreen('Event')}: ${eventName}`, 'log');

			client.on(eventName, event.bind(null, client));
		}
	};
	['client', 'guild'].forEach((x) => loadEvent(x));

	// Search the music's events
	const loadMusic = () => {
		const events = readdirSync(`./events/music/`).filter(d => d.endsWith('js'));
		for (const file of events) {
			const event = require(`./events/music/${file}`);
			const eventName = file.split('.')[0];
			logger.log(`Loading ${bgCyan('Music Event')}: ${eventName}`, 'log');

			client.distube.on(eventName, event.bind(null, client, status));
		}
	};
	['music'].forEach((x) => loadMusic(x));

	

	client.login(token);
};

init();