const time = new Date().toLocaleString();
const config = require('../../config.json');

module.exports = async (client, message) => {
	const { container } = client;

	if (message.author.bot) return;

	const prefixMention = new RegExp(`^<@!?${client.user.id}> ?$`);
	if (message.content.match(prefixMention)) {
		return message.reply(`My prefix is \`${config.prefix}\``);
	}

	const prefix = new RegExp(`^<@!?${client.user.id}> |^\\${config.prefix}`).exec(message.content);

	if (!prefix) return;

	const args = message.content.slice(prefix[0].length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (message.guild && !message.member) await message.guild.members.fetch(message.author);

	const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command));

	if (!cmd) return;

	if (!cmd.conf.enabled) return;

	message.flags = [];
	while (args[0] && args[0][0] === '-') {
		message.flags.push(args.shift().slice(1));
	}

	try {
		await cmd.run(client, message, args);

		const CommandText = `${message.author.tag} in ${message.guild.name} channel triggered an interaction in ${time}.\n `;

		console.log(CommandText);
	} catch (e) {
		console.error(e);
		message.channel.send({
			content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
		});
		console.error('An error occurred replying on an error', e);
	}
};
