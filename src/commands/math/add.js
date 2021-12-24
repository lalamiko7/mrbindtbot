const DiscordJS = require('discord.js');

module.exports = {
    callback: (message, ...args) => {
        if (message.isCommand()) {
            const { options } = message;
            const num1 = options.getNumber('num1');
            const num2 = options.getNumber('num2');

            message.reply(`The sum is ${num1 + num2}`)
            return;
        }
        let sum = 0;

        for (const arg of args) {
            sum += parseInt(args);
        }

        message.reply(`The sum is ${sum}`);
    }
}

module.exports.setup = function (slash_commands) {
    slash_commands.create({
        name: 'add',
        description: 'adds two numbers',
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
            }
        ]
    })
}
