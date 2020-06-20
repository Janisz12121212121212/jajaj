const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "zglos",
    category: "moderacja",
    description: "reporty",
    usage: "<członek, id>",
    run: async (client, message, args) => {
        // If the bot can delete the message, do so
        if (message.deletable) message.delete();

        // Either a mention or ID
        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No person found
        if (!rMember)
            return message.reply("Nie możesz znaleść tej osoby?").then(m => m.delete(5000));

        // The member has BAN_MEMBERS or is a bot
        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("nie moge zgłośić tego członka").then(m => m.delete(5000));

        // If there's no argument
        if (!args[1])
            return message.channel.send("Podaj powód zgłoszenia").then(m => m.delete(5000));
        
        const channel = message.guild.channels.find(c => c.name === "zgłoszenia")
            
        // No channel found
        if (!channel)
            return message.channel.send("nie moge znalesc #zgłoszenia").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Członek zgłoszony", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> Członek:** ${rMember} (${rMember.user.id})
            **> zgłoszony przez:** ${message.member}
            **> zgłoszone w:** ${message.channel}
            **> powód:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    }
}