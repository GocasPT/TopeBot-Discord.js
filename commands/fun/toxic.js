const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'toxic',
    aliases: [''], 
    categories : 'fun', 
    permissions : ' ', 
    description: 'Nada de toxicidade aqui',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send('Tope do not like toxics here. Please, friends :)');
    }
}