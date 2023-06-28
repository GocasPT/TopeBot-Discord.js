const { EmbedBuilder } = require('discord.js');
const progressbar = require('string-progressbar');
const { subtractTimeString } = require('../../modules/functions');

exports.run = (client, message) => {
	const queue = client.distube.getQueue(message);
	if (!queue)
		return message.channel.send(
			`${client.emotes.error} | There is nothing in the queue right now!`
		);
	const song = queue.songs[0];

	let songDuration = song.formattedDuration;
	const nowPlayingEmbed = new EmbedBuilder()
		.setColor('0xfaff67')
		.setTitle('Now playing')
		.setDescription(`${song.name}\n${song.url}`);

	if (songDuration == 'Live') {
		nowPlayingEmbed.addFields({ name: '\u200B', value: `${songDuration}` });
	} else {
		let songTime = queue.formattedCurrentTime;

		if (songTime.length < 8) {
			songTime = `00:${songTime}`;
		}

		if (songDuration.length < 8) {
			songDuration = `00:${songDuration}`;
		}

		const songRemain = subtractTimeString(songTime, songDuration);

		const songTimeArray = songTime.split(':');
		const songDurationnumArray = songDuration.split(':');

		const songTimeNum = +songTimeArray[0] * 60 * 60 + +songTimeArray[1] * 60 + +songTimeArray[2];
		const songDurationNum =
			+songDurationnumArray[0] * 60 * 60 + +songDurationnumArray[1] * 60 + +songDurationnumArray[2];

		let songPerc = (songTimeNum / songDurationNum) * 100;
		if (songPerc < 5) songPerc = 5;

		const progressbarSong = progressbar.splitBar(100, songPerc, 18);

		nowPlayingEmbed
			.addFields({
				name: '\u200B',
				value: `${songTime} [${progressbarSong[0]}] ${songDuration}`,
			})
			.setFooter({ text: `Time Remaining:${songRemain}` });
	}

	message.channel.send({ embeds: [nowPlayingEmbed] });
};

exports.conf = {
	enabled: true,
	aliases: ['nowplaying', 'np'],
};

exports.help = {
	name: 'nowplaying',
	category: 'Music',
	description: 'Show the song that is playing now',
	usage: 'nowplaying',
};
