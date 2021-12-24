const getFiles= require('./get-files.js');
const ping = require("./commands/ping.js");

module.exports = (client) => {
    const commands = {};

    const suffix = '.js';

    const commandFiles = getFiles('./commands', suffix);
    console.log(commandFiles);

    for (const command of commandFiles) {
        let commandFile = require(command);
        if (commandFile.default) {
            commandFile = commandFile.default;
        }

        const split = command.replace(/\\/g, '/').split('/');
        const commandName = split[split.length - 1].replace(suffix, '');

        commands[commandName.toLowerCase()] = commandFile;
    }

    //console.log(commands);

    client.on('messageCreate', (message) => {
        if (message.author.bot || !message.content.startsWith('-')) {
            return;
        }

        const args = message.content.slice(1).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!commands[commandName]) {
            return;
        }

        try {
            commands[commandName].callback(message, ...args);
        } catch (error) {
            console.log(error);
        }
    });

    const guildId = '716974738915852348';
    const guild = client.guilds.cache.get(guildId);
    let slash_commands;

    if (guild) {
        slash_commands = guild.commands;
    } else {
        slash_commands = client.application.commands;
    }

    for (let i = 0; i < commandFiles.length; i++) {
        let j = require(commandFiles[i]);
        j.setup(slash_commands);
    }

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }

        const { commandName } = interaction;
        if (!commands[commandName]) {
            return;
        }

        try {
            commands[commandName].callback(interaction);
        } catch (error) {
            console.log(error);
        }
    });
}
