const { RichEmbed } = require("discord.js")
const beatutify = require("beatuify");

module.exports = {
    name: "eval",
    aliases: ["e"],
    usage: "<kod evala>",
    run: async (client, message, args) => {
        if (message.author.id !== "533995921348755456"){
            return message.channel.send("Nie jesteś technikiem tego serwera tego bota!!")
                .then(m => m.delete(5000))
        }

        if (!args[0]) {
            message.channel.send("Musisz coś wpisać")
                .then(m => m.delete(5000))
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) {
                return;
            }

            const toEval = args.join(" ");
            const evaluated = eval(toEval);

            let embed = new RichEmbed()
                .setColor("#00FF00")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beatutify(args.join(" "), { format: "js"})}\n\`\`\``)
                .addField("evaluated:", evaluated)
                .addField("type of:". typeof(evaluated))

                message.channel.send(embed)
        } catch (e){
            let embed = new RichEmbed()
            .setColor("#FF0000")
            .setTitle("\:x: Wystapil blad")
            .setDescription(e)
            .setFooter(client.user.username, client.user.displayAvatarURL);

            message.channel.send(embed);
        }
    }
}