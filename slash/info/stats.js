const Discord = require('discord.js');
const { DurationFormatter } = require("@sapphire/time-utilities");
const { version } = require("discord.js");
const progressbar = require('string-progressbar');
const os = require("os");
const osUS = require('os-utils');

module.exports = {
	name: 'stats',
	description: "Gives some bot statistics and on the server that is",
	category: 'info',
	run: async (client, interaction) => {
		await interaction.reply('Statictics');

		const durationFormatter = new DurationFormatter();
		const durationBot = durationFormatter.format(client.uptime);
		const durationServer = durationFormatter.format(os.uptime());

		const MemTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
		const MemUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
		const MemBar = progressbar.filledBar(MemTotal, MemUsage)[0] + " " + progressbar.filledBar(MemTotal, MemUsage)[1].toFixed(0) + "%"

		const MemServerTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
		const MemServerUsage = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
		const MemServerBar = progressbar.filledBar(MemServerTotal, MemServerUsage)[0] + " " + progressbar.filledBar(MemServerTotal, MemServerUsage)[1].toFixed(0) + "%"

		const topeStats = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('TopeBot')
			.setThumbnail(`${client.user.displayAvatarURL()}`)
			.addFields(
				{ name: 'Updtime:', value: `${durationBot}` },
				{ name: 'CPU Usage:', value: `${'In develop...'}` },
				{ name: 'Mem Usage:', value: `${MemBar} MB in ${MemUsage} MB`},
				{ name: 'Discord.js:', value: `v${version}` },
				{ name: 'NodeJs:', value: `${process.version}`}
			)
		
		const serverStats = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Server')
			.addFields(
				{ name: 'Platform:', value: `${os.platform()}` },
				{ name: 'Uptime: ', value: `${durationServer}`},
				{ name: 'CPU Server Info:', value: `
					• CPU Model: ${os.cpus()[0].model}
					• Base velocity: ${os.cpus()[0].speed / 1000} GHz
					• Logical processors: ${os.cpus().length}
					• CPU Server Percentage: ${'In develop...'}` },
				{ name: 'Disck Server Free:', value: `${'In develop...'}`},
				{ name: 'Mem Server Free:', value: `${MemServerBar} GB in ${MemServerTotal} GB`},
			)

		interaction.channel.send({ embeds: [topeStats]});
		interaction.channel.send({ embeds: [serverStats]});
	},
};