const Discord = require('discord.js');
const { getDir } = require('../../modules/functions');
const { emojiFolder } = require('../../modules/emojiFolder')
const path = require('path');
const thumbnail = 'https://static.vecteezy.com/system/resources/previews/001/826/199/large_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg'

exports.run = async (client, message, args) => {
    const commandDir = '../commands';
    let foldersList = [];
    let categoryFolderList = [];
    let commandsArray = []
    let emoji = '';

    await getDir(commandDir, foldersList)

    if(args.length == 1){
        foldersList.forEach(async (i) => {
            let folderName = path.basename(foldersList[i])
            if(args[0] == folderName){
                let newDir = path.join(commandDir, folderName);

                await getDir(newDir, categoryFolderList)

                emoji = emojiFolder(folderName)

                if(!categoryFolderList.length){
                    commandsArray.push('*Nada*')
                    //embed.addField(`**${emoji} ${folderName}**`, `${commandsArray.join(', ')}`, true)
                } else {
                    for(commandFile of categoryFolderList){
                        commandsArray.push(path.basename(commandFile).slice(0, -3))
                    } 

                    //embed.addField(`**${emoji} ${folderName}**`, `\`${commandsArray.join(', ')}\``, true)
                }

                categoryFolderList = []
                commandsArray = []

                return
            }
        })
    } else if(args.length >= 2){
        message.channel.send('Introdusa só uma pasta para ir');
        return
    }

    let embed = new Discord.MessageEmbed()
        .setTitle('Dynamic Help Menu')
        .setAuthor('Topebot')
        .setThumbnail(thumbnail)
        .addField('\u200B','\u200B' );

    for(let i = 0; i < foldersList.length; i++){
        let folderName = path.basename(foldersList[i])
        let newDir = path.join(commandDir, folderName);

        await getDir(newDir, categoryFolderList)

        emoji = emojiFolder(folderName)

        if(!categoryFolderList.length){
            commandsArray.push('*Nada*')
            embed.addField(`**${emoji} ${folderName}**`, `${commandsArray.join(', ')}`, true)
        } else {
            for(commandFile of categoryFolderList){
                commandsArray.push(path.basename(commandFile).slice(0, -3))
            } 

            embed.addField(`**${emoji} ${folderName}**`, `\`${commandsArray.join(', ')}\``, true)
        }

        categoryFolderList = []
        commandsArray = []
    }

    message.channel.send({ embeds: [embed]});
};

exports.conf = {
    enabled: true,
    aliases: []
};

exports.help = {
    name: "help",
    category: "Info",
    description: "Dynamic hel menu",
    usage: "help"
};