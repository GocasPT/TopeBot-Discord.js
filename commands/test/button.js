const { MessageActionRow, MessageButton } = require('discord.js');

exports.run = async (client, message, args) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("upvote")
                .setEmoji("785062885952192512")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("downvote")
                .setEmoji("🍕")
                .setStyle("DANGER")
        );

    await message.reply({ content: 'Button!', components: [row] });

    client.on('interactionCreate', interaction => {
        if (!interaction.isButton()) return;
        console.log("Clicado")
        message.channel.send("Clicado")
    });
  };
  
  exports.conf = {
    enabled: true,
    aliases: []
  };
  
  exports.help = {
    name: "button",
    category: "Test",
    description: "Test buttons",
    usage: "button"
  };