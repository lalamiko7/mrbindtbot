const { MessageEmbed } = require('discord.js');

const name = 'help';
const description = 'a list of all possible commands';
const options = [];

const reply = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('kaas')
    .setAuthor('MrBindtBot', '', 'https://github.com/lalamiko7/mrbindtbot');

function setup(slash_commands) {
    slash_commands.create({
        name: name,
        description: description,
        options: options
    });
}

function command(message) {
    message.reply({ embeds: [reply] });
}

async function slash_command(command) {
    await command.deferReply({
        ephemeral: true
    })

    await command.editReply({ embeds: [reply] });
}

module.exports = {
    setup,
    command,
    slash_command
}