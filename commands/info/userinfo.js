const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "userinfo",
    aliases: ["kto", "on", "info"],
    description: "informacje o użytkowniku",
    usage: "[nazwa | id ]",
    category: "info",
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Informacje o członku:', stripIndents`**> Wyświetlana nazwa:** ${member.displayName}
            **> dołaczył :** ${joined}
            **> Role:** ${roles}`, true)

            .addField('Infromacje o użytkowniku:', stripIndents`**> ID:** ${member.user.id}
            **> Nazwa**: ${member.user.username}
            **> Tag**: ${member.user.tag}
            **> Stworzone w**: ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('obecnie gra', stripIndents`**> Nazwa:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}