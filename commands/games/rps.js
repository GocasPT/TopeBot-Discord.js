const { Client, Message, MessageEmbed } = require('discord.js');
const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: 'rps',
    aliases: [''], 
    categories : 'games', 
    permissions : ' ', 
    description: 'Rock, Paper and Scissor',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp();

        const m = await message.channel.send({embeds: [embed]});
        // Wait for a reaction to be added
        const reacted = await promptMessage(m, message.author, 30, chooseArr);
        
        // Get a random emoji from the array
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        // Check if it's a win/tie/loss
        const result = await getResult(reacted, botChoice);
        // Clear the reactions
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit({embeds: [embed]});
    }
}

async function getResult(me, clientChosen) {
    if ((me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")) {
            return "***You won!***";
    } else if (me === clientChosen) {
        return "***It's a tie!***";
    } else {
        return "***You lost!***";
    }
}

async function promptMessage(message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author, 
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) => chooseArr.includes(reaction.emoji.name) && user.id === author.id;
    
    // And ofcourse, await the reactions
    return message
        .awaitReactions({filter, max: 1, time: time})
        .then(collected => collected.first() && collected.first().emoji.name);
};