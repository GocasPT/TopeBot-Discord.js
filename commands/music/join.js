const { Constants } = require('discord.js')

exports.run = async (client, message, args) => {
	let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${client.emotes.error} | ${args[0]} is not a valid voice channel!`)
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${client.emotes.error} | You must be in a voice channel or enter a voice channel id!`
      )
    }
    client.distube.voices.join(voiceChannel)
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'join',
	category: 'Music',
	description: 'Join...',
	usage: 'join',
};