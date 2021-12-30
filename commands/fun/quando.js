const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'quando',
    aliases: [''], 
    categories : 'fun', 
    permissions : ' ', 
    description: 'Quando?',
    cooldown : 10000,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send('https://media.tenor.com/images/6ccf174170bc567c9df1d99559544952/tenor.gif');
        message.channel.send('**JAMAIS**');
    }
}