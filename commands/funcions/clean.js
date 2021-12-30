const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clean',
    aliases: [''], 
    categories : 'funcions', 
    permissions : ' ', 
    description: 'Clean messages',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]){
            n=1
        }else{
            n = args[0]
        }

        message.channel.bulkDelete(n)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);
    }
}