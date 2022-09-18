const { EmbedBuilder } = require('discord.js');
const { getDir } = require('../../modules/functions');
const { emojiFolder } = require('../../modules/emojiFolder');
const path = require('path');
const thumbnail = 'https://static.vecteezy.com/system/resources/previews/001/826/199/large_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg';

exports.run = async (client, message, args) => {
	const commandDir = '../commands';
	const foldersList = [];
	let categoryFolderList = [];
	let commandsArray = [];
	let emoji = '';

	await getDir(commandDir, foldersList);

	const helpEmbed = new EmbedBuilder()
		.setTitle('Dynamic Help Menu')
		.setAuthor({ name: 'Topebot' })
		.setThumbnail(thumbnail)
		.addFields({ name: '\u200B', value: '\u200B' });

	if (args.length == 1) {
		for (let i = 0; i < foldersList; i++) {
			const folderName = path.basename(foldersList[i]);
			if (args[0] == folderName) {
				const newDir = path.join(commandDir, folderName);

				await getDir(newDir, categoryFolderList);

				emoji = emojiFolder(folderName);

				helpEmbed.addFields(`**${emoji} ${folderName}**`, '\u200B');

				if (!categoryFolderList.length) {
					commandsArray.push('*Nada*');
					helpEmbed.addFields({ name: '\u200B', value: `${commandsArray.join(', ')}` });
				}
				else {
					for (const commandFile of categoryFolderList) {
						commandsArray.push(path.basename(commandFile).slice(0, -3));
					}

					helpEmbed.addFields({ name: '\u200B', value: `\`${commandsArray.join(', ')}\`` });
				}

				categoryFolderList = [];
				commandsArray = [];
			}
		}

	}
	else if (args.length >= 2) {
		message.channel.send('Introdusa só uma pasta para ir');

	}
	else {
		for (let i = 0; i < foldersList.length; i++) {
			const folderName = path.basename(foldersList[i]);
			const newDir = path.join(commandDir, folderName);

			await getDir(newDir, categoryFolderList);

			emoji = emojiFolder(folderName);

			if (!categoryFolderList.length) {
				commandsArray.push('*Nada*');
				helpEmbed.addFields({ name: `**${emoji} ${folderName}**`, value: `${commandsArray.join(', ')}`, inline: true });
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

	//message.channel.send({ embeds: [helpEmbed] });
	message.channel.send('Por algum motivo, não vou ajudar. Dm o Camacho que ele ajuda')
};

exports.conf = {
	enabled: true,
	aliases: [],
};

exports.help = {
	name: 'help',
	category: 'Info',
	description: 'Dynamic hel menu',
	usage: 'help',
};