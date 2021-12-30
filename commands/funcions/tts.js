const { Client, Message, MessageEmbed } = require('discord.js');
const discordTTS=require("discord-tts");

module.exports = {
    name: 'tts',
    aliases: [''], 
    categories : 'funcions', 
    permissions : ' ', 
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) {
            message.reply('Please enter an text to speech')
        };

        const nickname = message.author.username
        message.delete()
            .then(message.channel.send(`${nickname} said: ${args}`))
            .catch(console.error);

        const broadcast = client.voice.createBroadcast();
        var channelId = message.member.voice.channelID;
        var channel = client.channels.cache.get(channelId);
        channel.join().then(connection => {
            broadcast.play(discordTTS.getVoiceStream(args));
            const dispatcher=connection.play(broadcast);
        });
    }
}