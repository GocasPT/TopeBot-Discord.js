const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'logic',
    aliases: [''], 
    categories : 'info', 
    permissions : ' ', 
    description: 'Frase lógica',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send('Vais ao estrangeiro passa umas férias\n'
            + 'Vai a um restaurante e pedes comida.\n'
            + 'Mas pedistes o que?\n'
            + '**COMIDA DO TEU PAIS**!!'
            + 'ou seja, ***SAI DO TEUS PAIS PARA COMER COMIDA DO TEU PAIS***\n'
            + '***#FuckLogic***');
    }
}