const { EmbedBuilder } = require('discord.js');
const { getDir } = require('../../modules/functions');
const emojiFolder = require('../../modules/emojiFolder.json');
const path = require('path');

exports.run = async (client, message, args) => {
	const thumbnail = client.user.avatarURL();
	const commandDir = '../commands';
	const foldersList = [];
	let categoryFolderList = [];
	let commandsArray = [];
	let emoji = '';

	await getDir(commandDir, foldersList);

	const helpEmbed = new EmbedBuilder()
		.setTitle('Dynamic Help Menu')
		.setAuthor({ name: 'Topebot', avatarURL: thumbnail, url: 'https://github.com/GocasPT/TopeBot-Discord.js' })
		.setThumbnail(thumbnail)

	if (args.length == 1) {
		let i
		for (i = 0; i < foldersList.length; i++) {
			const folderName = path.basename(foldersList[i]);
			if (args[0] == folderName) {
				const newDir = path.join(commandDir, folderName);
				
				await getDir(newDir, categoryFolderList);

				emoji = emojiFolder[`${folderName}`];
				helpEmbed.setTitle(`Dynamic Help Menu - ${emoji} ${folderName}`)

				if (!categoryFolderList.length) {
					helpEmbed.setDescription(`***Nada***`);
					break
				}

				for (const commandFile of categoryFolderList) {
					commandsArray.push(path.basename(commandFile).slice(0, -3));
				}

				helpEmbed.setDescription(`**→ ${commandsArray.join('\n→ ')}**`);
				break
			} 
		}

		if (i == foldersList.length) {
			for (i = 0; i < foldersList.length; i++) {
				const folderName = path.basename(foldersList[i]);

				const newDir = path.join(commandDir, folderName);
				
				await getDir(newDir, categoryFolderList);

				emoji = emojiFolder[`${folderName}`];

				if (!categoryFolderList.length) {
					continue
				}

				for (const commandFile of categoryFolderList) {
					let commandFileName = path.basename(commandFile).slice(0, -3);
					if(args[0] == commandFileName){
						const props = require(commandFile);
						helpEmbed.setTitle(`Dynamic Help Menu - ${commandFileName}`)
						helpEmbed.setDescription(`Desciption: ${props.help.description}\n Alieses: ${props.conf.aliases}\n Category: ${props.help.category}`);
						break
					}
				}
			}

			if (i == foldersList.length) {
				return message.channel.send("Não existe essa categoria ou comando com esse nome")
			}
		}

	}
	else if (args.length >= 2) {
		return message.reply('Introdusa uma categoria ou um comando');

	}
	else {
		for (let i = 0; i < foldersList.length; i++) {
			const folderName = path.basename(foldersList[i]);
			const newDir = path.join(commandDir, folderName);

			await getDir(newDir, categoryFolderList);

			emoji = emojiFolder[`${folderName}`];

			if (!categoryFolderList.length) {
				helpEmbed.addFields({ name: `**${emoji} ${folderName}**`, value: `*Nada*`, inline: true });
			}
			else {
				for (const commandFile of categoryFolderList) {
					commandsArray.push(path.basename(commandFile).slice(0, -3));
				}

				helpEmbed.addFields({ name: `**${emoji} ${folderName}**`, value: `\`${commandsArray.join(', ')}\``, inlie: true });
			}

			categoryFolderList = [];
			commandsArray = [];
		}
	}

	message.channel.send({ embeds: [helpEmbed] });
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'help',
	category: 'Info',
	description: 'Dynamic help menu',
	usage: 'help',
};