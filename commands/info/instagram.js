const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    aliases: ["insta"],
    category: "info",
    usage: "<nazwa>",
    run: async (client, message, args) => {
        const name = args.join(" ");

        if (!name) {
            return message.reply("Może warto poszukać kogoś ...")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        const res = fetch(url).then(url => url.json());
    }
}