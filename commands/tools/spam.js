exports.run = (client, message) => {
    for(let i = 0; i < 5; i++){
        message.channel.send(`@everyone`);
    }
};

exports.conf = {
	enabled: true,
	aliases: ['spam'],
};

exports.help = {
	name: 'spam',
	category: 'Tools',
	description: 'Spama todas as pessoas do servidor',
	usage: 'spam',
};