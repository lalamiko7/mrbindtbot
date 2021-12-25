const getFiles= require('./get-files.js');

module.exports = (client, prefix, dev_guild) => {
    const commands = {};

    const suffix = '.js';

    const commandFiles = getFiles('./commands', suffix);

    for (const command of commandFiles) {
        let commandFile = require(command);
        if (commandFile.default) {
            commandFile = commandFile.default;
        }

        const split = command.replace(/\\/g, '/').split('/');
        const commandName = split[split.length - 1].replace(suffix, '');

        commands[commandName.toLowerCase()] = commandFile;
    }

    const guild = client.guilds.cache.get(dev_guild);
    let slash_commands;

    if (guild) {
        slash_commands = guild.commands;
    } else {
        slash_commands = client.application.commands;
    }

    for (let i = 0; i < commandFiles.length; i++) {
        let j = require(commandFiles[i]);
        if (typeof(j.setup) === 'function') {
            j.setup(slash_commands);
        }
    }

    console.log(commandFiles);

    client.on('messageCreate', (message) => {
        if (message.author.bot || !message.content.startsWith(prefix)) {
            return;
        }

        const args = message.content.slice(1).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!commands[commandName]) {
            return;
        }

        try {
            commands[commandName].command(message, ...args);
        } catch (error) {
            console.log(error);
        }
    });

    client.on('interactionCreate', (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }

        const { commandName, options } = interaction;
        if (!commands[commandName]) {
            return;
        }

        try {
            commands[commandName].slash_command(interaction, options);
        } catch (error) {
            console.log(error);
        }
    });

}
