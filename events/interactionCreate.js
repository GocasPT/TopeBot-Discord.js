const fs = require('fs')
const time = new Date();

module.exports = (client, message, interaction) => {
	let InteractionText = `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction in ${time}.\n`
	
	console.log(InteractionText);
	
	fs.writeFile('InteractionLog.txt', InteractionText, { flag: 'a+' }, (err) => {
		
		if (err) throw err;
	})
};