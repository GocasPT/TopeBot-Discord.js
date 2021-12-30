const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'chamar',
    aliases: ['call', 'Chamar'], 
    categories : 'funcions', 
    permissions : ' ', 
    description: 'Chama alguem',
    cooldown : 10,
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
            
            if (!args[1]) {
                n = 5
            }else{
                n = args[1]
            }

           for (let i=0; i < n; i++) {
            message.channel.send(`${mention}`);
           }
        }
    }
}