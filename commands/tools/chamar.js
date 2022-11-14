const { MessageMentions } = require("discord.js");

exports.run = (client, message, args) => {
	if (!args) return message.channel.send('Miss person to tag');

    let isMention = args[0].match(MessageMentions.UsersPattern)

    if(!isMention)
        return message.reply(`Precisa de ser uma menção`)

    for(let i = 0; i < 5; i++){
        message.channel.send(`${message.mentions.members.first()}`);
    }
};

exports.conf = {
	enabled: true,
	aliases: ['chamar'],
};

exports.help = {
	name: 'chamar',
	category: 'Tools',
	description: 'Chama as pessoa mensionada',
	usage: 'chamar',
};