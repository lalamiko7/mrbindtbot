function command (message, ...args) {
    const guild_commands = [];
    message.guild.commands.cache.forEach((value, key) => {
        guild_commands.push([value.name, key].join(': '));
    });

    message.reply(guild_commands.join('\n'));
}

module.exports = {
    command
}