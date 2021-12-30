const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bye',
    aliases: ['adeus'], 
    categories : 'funcions', 
    permissions : ' ', 
    description: 'Dizer adeus a alguem',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const { getUserFromMention } = require('../../utils/function');

        const mention = client.users.cache.get(getUserFromMention(args[0]));

        if(!mention) {
            return message.reply('Fala o *@* da pessoa');
        }
        else {
            message.channel.send(`Adeus ${mention}. Até à proxima vida.`)
            message.channel.send('https://i.gifer.com/origin/3f/3f1d28bba304699e058d3e3230ce87ad_w200.gif')
        }
    }
}