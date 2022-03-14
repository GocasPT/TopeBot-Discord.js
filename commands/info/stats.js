const Discord = require('discord.js');
const { DurationFormatter } = require("@sapphire/time-utilities");
const { version } = require("discord.js");
const os = require("os");

exports.run = (client, message, args) => {
  const durationFormatter = new DurationFormatter();
  const duration = durationFormatter.format(client.uptime);
  
  const topeStats = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('TopeBot')
    .addFields(
      { name: 'Updtime:', value: `${duration}` },
      { name: 'CPU Usage:', value: `${'In develop...'}` },
      { name: 'Mem Usage:', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB in ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`},
      { name: 'Discord.js:', value: `v${version}` },
      { name: 'NodeJs:', value: `${process.version}`}
    )
  
  const serverStats = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Server')
    .addFields(
      { name: 'Platform:', value: `${os.platform()}` },
      { name: 'CPU Server Info:', value: `
        CPU Model: ${os.cpus()[0].model}
        Base velocity: ${os.cpus()[0].speed / 1000} GHz
        Logical processors: ${os.cpus().length}` },
      { name: 'Mem Server Free:', value: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB in ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`},
    )

    message.channel.send({ embeds: [topeStats]});
    message.channel.send({ embeds: [serverStats]});
    return
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
    name: "stats",
    category: "Info",
    description: "Gives some bot statistics and on the server that is",
    usage: "stats"
  };