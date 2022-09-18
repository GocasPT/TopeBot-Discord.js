exports.run = (client, message) => {
    for(let i = 0; i < 5; i++){
        message.channel.send(`@everyone`);
    }
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'spam',
	category: 'Tools',
	description: 'Spama...',
	usage: 'spam',
};