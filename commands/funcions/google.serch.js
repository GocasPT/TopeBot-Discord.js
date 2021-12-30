const { Client, Message, MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: 'google.search',
    aliases: [''], 
    categories : 'funcions', 
    permissions : ' ', 
    description: 'Tope search what ever you want',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let googleKey = "AIzaSyBrQMd5qOESctvx16YtOrXy3Pz1H7eJ8XQ";

        let csx = "45278421e8f93af52"; // Search engine ID.

        let query = args[0];

        let result;



        if (!query) return message.channel.send("Please enter the query.");



        href = await search(query);

        if (!href) return message.channel.send("Unknown search.");



        const embed = new MessageEmbed()

        .setTitle(href.title)

        .setDescription(href.snippet)

        //.setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.

        .setURL(href.link)

        .setColor(0x7289DA)

        .setFooter("Powered by Google")



        return message.channel.send(embed);

        async function search(query) {

            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
        
                key: googleKey, cx: csx, safe: "off", q: query
        
            });
        
        
        
            if (!body.items) return null;
        
            return body.items[0];
        
        }
    }
}