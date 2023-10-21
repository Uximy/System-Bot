const { client } = require("../System_start");
let config = require('../Config/config.json');

const pingCommand = {
    name: "ping",
    description: "Test the bot's responsiveness with a simple ping command"
};

const guild = client.guilds.cache.get(`${config.Guild_id}`);
guild.commands.create(pingCommand);

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
});