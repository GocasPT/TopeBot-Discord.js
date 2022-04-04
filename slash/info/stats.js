const Discord = require('discord.js');
const { DurationFormatter } = require("@sapphire/time-utilities");
const { version } = require("discord.js");
const progressbar = require('string-progressbar');
const os = require("os");

module.exports = {
	name: 'stats',
	description: "Gives some bot statistics and on the server that is",
	category: 'info',
	run: async (client, interaction) => {
		await interaction.reply('Statictics');

		const durationFormatter = new DurationFormatter();
		const durationBot = durationFormatter.format(client.uptime);
		const durationServer = durationFormatter.format(os.uptime());
		
		const CPUServerTotal = 100;
		let CPUServerUsage;

		const p1 = osu.cpu.usage().then(cpuPercentage => {
			CPUServerUsage = cpuPercentage.toFixed(2);
		})

		await p1

		const CPUServerBar = progressbar.filledBar(CPUServerTotal, CPUServerUsage)[0] + " " + progressbar.filledBar(CPUServerTotal, CPUServerUsage)[1] + "%";

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
				{ name: 'Mem Usage:', value: `${MemBar} in ${MemUsage} MB`},
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
					• CPU Server Usage Percentage: ${CPUServerBar}` },
				{ name: 'Mem Server:', value: `${MemServerBar} in ${MemServerTotal} GB`},
			)

		interaction.channel.send({ embeds: [topeStats]});
		interaction.channel.send({ embeds: [serverStats]});
	},
};