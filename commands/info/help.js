const { getDir } = require('../../modules/functions')

exports.run = async (client, message, args) => {
    const commandDir = '../commands';
    let list = [];

    getDir(commandDir, list)

    setTimeout(() => {
        console.log(list)
    }, 50);
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