/* const Discord = require('discord.js');
const { version } = require("discord.js");
const { DurationFormatter } = require("@sapphire/time-utilities");
const os = require("os");
const durationFormatter = new DurationFormatter(); */

const Discord = require('discord.js');
const { DurationFormatter } = require("@sapphire/time-utilities");
const { version } = require("discord.js");
const os = require("os");

module.exports = {
	name: 'stats',
	description: "Gives some bot statistics and on the server that is",
	category: 'info',
	run: async (client, interaction) => {
		await interaction.reply('Statictics');

		const durationFormatter = new DurationFormatter();
		const duration = durationFormatter.format(client.uptime);
		const topeStats = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('TopeBot')
			.addFields(
				{ name: 'Updtime:', value: `${duration}` },
				{ name: 'CPU Usage:', value: `${'In develop...'}` },
				{ name: 'Mem Usage:', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB in ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`},
				{ name: 'Discord.js:', value: `v${version}` },
				{ name: 'NodeJs:', value: `${process.version}`}
			)
		
		const serverStats = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Server')
			.addFields(
				{ name: 'Platform:', value: `${os.platform()}` },
				{ name: 'CPU Server Info:', value: `
					CPU Model: ${os.cpus()[0].model}
					Base velocity: ${os.cpus()[0].speed / 1000} GHz
					Logical processors: ${os.cpus().length}` },
				{ name: 'Mem Server Free:', value: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB in ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`},
			)

		interaction.channel.send({ embeds: [topeStats]});
		interaction.channel.send({ embeds: [serverStats]});
	},
};