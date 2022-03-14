const DiscordJS = require('discord.js');

function setup (slash_commands) {
    slash_commands.create({
        name: 'multiply',
        description: 'Multiplies two or three numbers',
        options: [
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
        ]
    });
}

function command (message, ...args) {
    let answer = 1;

    for (const arg of args) {
        answer = parseInt(arg) * answer;
    }

    message.reply(`The answer is **${answer}**!`);
}

async function slash_command(command, options) {
    const num1 = options.getNumber('num1');
    const num2 = options.getNumber('num2');
    const num3 = options.getNumber('num3');


    await command.deferReply({
        ephemeral: true
    })

    if (!num3) {
        await command.editReply(`The product of **${num1}** and **${num2}** is **${num1 * num2}**!`);
    } else {
        await command.editReply(`The product of **${num1}**, **${num2}** and **${num3}** is **${num1 * num2 * num3}**!`);
    }
}

module.exports = {
    setup,
    command,
    slash_command
}