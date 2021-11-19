const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require("../config.json");


module.exports = {
    name: "ready",
    once: true,
    execute(client, commands) {
        const rest = new REST({ version: '9' }).setToken(token);
        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
            console.log(`Logged in as ${client.user.tag}!`);
        })();
    }
}