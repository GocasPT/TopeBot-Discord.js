const { getDir, numberGenerator } = require('../../modules/functions')
const { MessageAttachment } = require('discord.js');

exports.run = async (client, message, args) => {
    const msg = await message.reply('Searching a quote...');
    
    let quotesDir = '/ImageLibary/Quotes';
    let listQuote = [];

    getDir(quotesDir, listQuote);

    setTimeout(() => {
      const i = numberGenerator(0, listQuote.length-1);
      const attachment = new MessageAttachment(`${listQuote[i]}`);
      
      msg.edit('Quote:')

      message.channel.send({ files: [attachment] });
    }, 50);
  };
  
  exports.conf = {
    enabled: true,
    aliases: ['frase']
  };
  
  exports.help = {
    name: "quote",
    category: "Fun",
    description: "Random quote from tope",
    usage: "quote"
  };