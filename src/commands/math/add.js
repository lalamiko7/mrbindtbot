const DiscordJS = require('discord.js');

const name = 'add';
const description = 'adds two numbers'
const options = [
    {
        name: 'num1',
        description: 'first number',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
    },
    {
        name: 'num2',
        description: 'second number',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
    },
    {
        name: 'num3',
        description: 'a possible third number',
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
    }
];

function setup (slash_commands) {
    slash_commands.create({
        name: name,
        description: description,
        options: options
    });
}

function command (message, ...args) {
    let sum = 0;

    for (const arg of args) {
        sum += parseInt(arg);
    }

    message.reply(`The sum is **${sum}**!`);
}

async function slash_command(command, options) {
    const num1 = options.getNumber('num1');
    const num2 = options.getNumber('num2');
    const num3 = options.getNumber('num3');


    await command.deferReply({
        ephemeral: true
    })

    if (!num3) {
        await command.editReply(`The sum of **${num1}** and **${num2}** is **${num1 + num2}**!`);
    } else {
        await command.editReply(`The sum of **${num1}**, **${num2}** and **${num3}** is **${num1 + num2 + num3}**!`);
    }
}

module.exports = {
    setup,
    command,
    slash_command
}