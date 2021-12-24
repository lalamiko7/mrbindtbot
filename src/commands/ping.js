module.exports = {
    callback: (message, ...args) => {
        message.reply('pong');
    }
}

module.exports.setup = function (slash_commands) {
    slash_commands.create({
        name: 'ping',
        description: 'replies with pong!'
    })
}
