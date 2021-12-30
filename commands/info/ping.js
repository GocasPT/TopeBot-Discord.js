const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [''], 
    categories : 'info', 
    permissions : ' ', 
    description: 'Mostra o Ping do Bot',
    cooldown : 10000,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            let ping = new MessageEmbed()
            .setDescription(`🏓 Ping : ${client.ws.ping}`)

            message.channel.send({embeds : [ping]})
        } catch (e) {
            console.log(e);
        }
    }
}