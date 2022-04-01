const path = require('path');
const fs = require('fs');
const { numberGenerator } = require('../../modules/functions')
const { MessageAttachment } = require('discord.js');

exports.run = async (client, message, args) => {
    const msg = await message.reply('Searching a quote...');

    let quotesFolder = path.join(__dirname, '../../modules/ImageLibary/Quotes');
    let listQuote = [];

    fs.readdir(quotesFolder, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }

      for(quote of files){
        listQuote.push(path.join(quotesFolder, quote));
      }
    });
    
    setTimeout(() => {
      const i = numberGenerator(0, listQuote.length-1);
      const attachment = new MessageAttachment(`${listQuote[i]}`);
      
      msg.edit('Quote:')

      message.channel.send({ files: [attachment] });
    }, 500);
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