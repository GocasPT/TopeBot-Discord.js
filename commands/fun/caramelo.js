const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'caramelo',
    aliases: [''], 
    categories : 'fun', 
    permissions : ' ', 
    description: 'Oração a Caramelo',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send('Eu gostos de caramelos. O cão da Marta chama-se Caramelo. Logo, pelo teorema da energia cinética e pelo Princípio de Le Châtelier, eu gosto do Caramelo\n'
        + '**I <3 CARMELO**');
    }
}