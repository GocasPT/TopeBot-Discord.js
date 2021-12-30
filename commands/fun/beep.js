const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'beep',
    aliases: [''], 
    categories : 'fun', 
    permissions : ' ', 
    description: 'Boop',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send("**BOOP!!**");
    }
}