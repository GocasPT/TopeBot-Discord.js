const fs = require('fs')
const time = new Date();

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const cmd = client.container.slashcmds.get(interaction.commandName);
  
  if (!cmd) return;

  try {
    await cmd.run(client, interaction);

    let InteractionText = `${interaction.user.tag} in ${interaction.guild.name} channel triggered an interaction in ${time}.\n`

    console.log(InteractionText);
	
    fs.writeFile('InteractionLog.txt', InteractionText, { flag: 'a+' }, (err) => {
      if (err) throw err;
    })

  } catch (e) {
    console.error(e);
    if (interaction.replied) 
      interaction.followUp({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
    if (interaction.deferred)
      interaction.editReply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
      interaction.reply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred replying on an error", e));
  }
};