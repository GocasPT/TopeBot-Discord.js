const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'STFU',
    aliases: ['stfu'], 
    categories : 'fun', 
    permissions : ' ', 
    description: 'Shut The Fuck Up pharse',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send('**OH TU!!! CALA-TE CABRÃO MERDA DE UM FILHO DA PUTA DE UMA ESCRAVA AFRICANA DO SÉCULO XXI**');
        message.channel.send('Vou te recomendar uma música para ti');
        message.channel.send('https://www.youtube.com/watch?v=OLpeX4RRo28')
    }
}