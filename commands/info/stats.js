const { version, EmbedBuilder } = require('discord.js');
const humanizeDuration = require('humanize-duration');
const progressbar = require('string-progressbar');
const os = require('os');
const osu = require('node-os-utils');

exports.run = async (client, message) => {
	const msg = await message.reply('Calculating...');

	//	Uptime
	const durationBot = humanizeDuration(client.uptime, { round: true });
	const durationServer = humanizeDuration(os.uptime() * 1000, { round: true });

	//	CPU
	let CPUServerUsage;
	const p1 = osu.cpu.usage().then((cpuPercentage) => {
		CPUServerUsage = cpuPercentage.toFixed(2);
	});
	await p1;

	const CPUServerBar = `${progressbar.filledBar(100, CPUServerUsage)[0]} ${
		progressbar.filledBar(100, CPUServerUsage)[1]
	}%`;

	//	RAM
	const MemTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
	const MemUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
	const MemBar = `${progressbar.filledBar(MemTotal, MemUsage)[0]} ${progressbar
		.filledBar(MemTotal, MemUsage)[1]
		.toFixed(0)}%`;

	const MemServerTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
	const MemServerUsage = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
	const MemServerBar = `${progressbar.filledBar(MemServerTotal, MemServerUsage)[0]} ${progressbar
		.filledBar(MemServerTotal, MemServerUsage)[1]
		.toFixed(0)}%`;

	msg.delete();
	const topeStats = new EmbedBuilder()
		.setColor('Random')
		.setTitle('TopeBot')
		.setThumbnail(`${client.user.displayAvatarURL()}`)
		.addFields(
			{ name: 'Updtime:', value: `${durationBot}` },
			{ name: 'Mem Usage:', value: `${MemBar} in ${MemUsage} MB` },
			{ name: 'Discord.js:', value: `v${version}` },
			{ name: 'NodeJs:', value: `${process.version}` }
		);

	const serverStats = new EmbedBuilder()
		.setColor('Random')
		.setTitle('Server')
		.addFields(
			{ name: 'Platform:', value: `${os.platform()}` },
			{ name: 'Uptime: ', value: `${durationServer}` },
			{
				name: 'CPU Server Info:',
				value: `
				• CPU Model: ${os.cpus()[0].model}
				• Base velocity: ${os.cpus()[0].speed / 1000} GHz
				• Logical processors: ${os.cpus().length}
				• CPU Server Usage Percentage: ${CPUServerBar}`,
			},
			{ name: 'Mem Server:', value: `${MemServerBar} in ${MemServerTotal} GB` }
		);

	message.channel.send({ embeds: [topeStats, serverStats] });
};

exports.conf = {
	enabled: true,
	aliases: ['stats'],
};

exports.help = {
	name: 'stats',
	category: 'Info',
	description: 'Gives some bot statistics and on the server that is',
	usage: 'stats',
};
