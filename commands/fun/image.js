const { getDir, numberGenerator } = require('../../modules/functions')
const { MessageAttachment } = require('discord.js');

exports.run = async (client, message, args) => {
    const msg = await message.reply('Searching a image...');

    let topeDir = '/ImageLibary/Tope';
    let listTope = [];

    getDir(topeDir, listTope)
    
    setTimeout(() => {
      const i = numberGenerator(0, listTope.length-1);
      const attachment = new MessageAttachment(`${listTope[i]}`);
  
      msg.delete()

      message.channel.send({ files: [attachment] });
    }, 50);
  };
  
  exports.conf = {
    enabled: true,
    aliases: ['imagem']
  };
  
  exports.help = {
    name: "image",
    category: "Fun",
    description: "Random image from tope",
    usage: "image"
  };