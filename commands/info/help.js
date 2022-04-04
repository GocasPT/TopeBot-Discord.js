const Discord = require('discord.js');
const { getDir } = require('../../modules/functions');
const path = require('path');

exports.run = async (client, message, args) => {
    const commandDir = '../commands';
    let foldersList = [];
    let categoryFolderList = [];
    let commandsString = ''

    let embed = new Discord.MessageEmbed()

    await getDir(commandDir, foldersList)

    for(let i = 0; i < foldersList.length; i++){
        let newDir = path.join(commandDir, path.basename(foldersList[i]));

        await getDir(newDir, categoryFolderList)

        if(!categoryFolderList.length){
            commandsString = 'Nada'
        } else {
            for(commandFile of categoryFolderList){
                commandsString = commandsString + path.basename(commandFile).slice(0, -3) + ' '
            } 
        }
        
        embed.addField(`${path.basename(foldersList[i])}`, `${commandsString}`)

        categoryFolderList = []
        commandsString = ' '
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