const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const moment = require("moment")

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

function trimArray(arr, maxLen = 25) {
  if (arr.array().length > maxLen) {
    const len = arr.array().length - maxLen;
    arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}

module.exports = {
  name: "userinfo",
  aliases: ["user"],
  categories: "info",
  permissions: " ",
  description: "Mostra todas as informações do usuario",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { getUserFromMention } = require('../../utils/function')

    const user = args[0] ?
      client.users.cache.get(getUserFromMention(args[0])):
      message.author

    if(!user || user == null || user.id == null || !user.id) return message.reply({content : "Não consegui encontrar o Usuario"})

    const member = message.guild.members.cache.get(user.id);  
    const roles = member.roles;
    const userFlags = member.user.flags.toArray();

    const EmbedUserInfo = new MessageEmbed()
    EmbedUserInfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    EmbedUserInfo.setAuthor("Information about:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
    EmbedUserInfo.addField('**❱ Username:**',`<@${member.user.id}>\n\`${member.user.tag}\``,true)
    EmbedUserInfo.addField('**❱ ID:**',`\`${member.id}\``,true)
    EmbedUserInfo.addField('**❱ Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)
    EmbedUserInfo.addField('**❱ Entrou no Discord:**', "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
    EmbedUserInfo.addField('**❱ Entrou no Server:**', "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
    EmbedUserInfo.addField('**❱ Casa do HypeSquad:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Sem abrigo'}\``,true)
    EmbedUserInfo.addField('**❱ Maior cargo:**',`${member.roles.highest.id === message.guild.id ? 'Não tem' : member.roles.highest}`,true)
    EmbedUserInfo.addField('**❱ É um Bot:**',`\`${member.user.bot ? "✔️" : "❌"}\``,true)
    EmbedUserInfo.addField('**❱ Permissões:**',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
    EmbedUserInfo.addField(`❱ [${roles.cache.size}] Cargos: `, roles.cache.size < 25 ? roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'Naõ tem')
    EmbedUserInfo.setColor(ee.color)
    EmbedUserInfo.setFooter(ee.footertext, ee.footericon)

    message.channel.send({embeds : [EmbedUserInfo]})
  },
};
