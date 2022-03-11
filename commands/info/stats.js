const { version } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { DurationFormatter } = require("@sapphire/time-utilities");
const os = require("os");
const durationFormatter = new DurationFormatter();


exports.run = (client, message, args) => {
    const duration = durationFormatter.format(client.uptime);
    const stats = codeBlock("asciidoc", `= STATISTICS =
    TopeBot Stats
    • Uptime     :: ${duration}
    • CPU Usage  :: ${'a'}
    • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB in ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB
    • Discord.js :: v${version}
    • Node       :: ${process.version}

    Server Stats
    • Platform :: ${os.platform()}
    • CPU Server Info::
        • CPU Model :: ${os.cpus()[0].model}
        • Base velocity :: ${os.cpus()[0].speed / 1000} GHz
        • Logical processors :: ${os.cpus().length}
    • Mem Server Free :: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB in ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
    `);

    return message.channel.send(stats);
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