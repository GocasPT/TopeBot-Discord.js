const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'spam',
    aliases: [''], 
    categories : 'funcions', 
    permissions : ' ', 
    description: 'SPAMAR!!',
    cooldown : 10,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[1]) {
            n = 5
        }else{
            n = args[1]
        }

       for (let i=0; i < n; i++) {
        message.channel.send(`@everyone`);
       }
    }
}