module.exports = {
    name: "ping",
    category: "info",
    description: "rt",
    run: async (client, message, args ) => {
        if (cmd === "ping") {
            const msg = await message.channel.send(`🏓 Pingowanie...`);
    
            msg.edit(`🏓 Pong\nOpóżnienie wynosi ${Math.floor(msg.createdTimestamp - message.createdAt)}ms\nAPI opóżnienie: ${Math.round(client.ping)}ms!`);
        }
    }
}