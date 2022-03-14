function setup (slash_commands) {
    slash_commands.create({
        name: 'ping',
        description: 'replies with pong and the latency!'
    });
}

function command (message) {
    message.reply('MrBindtBot is thinking...').then(
        (msg) => {
            msg.delete();
            message.reply(`Pong: **${msg.createdTimestamp - message.createdTimestamp}**ms`);
        }
    );
}

async function slash_command (interaction) {
    await interaction.deferReply({
        ephemeral: true,
    })

    await interaction.fetchReply().then(
        (reply) => {
            interaction.editReply(`Pong: **${reply.createdTimestamp - interaction.createdTimestamp}**ms`);
        }
    );
}

module.exports = {
    setup,
    command,
    slash_command
}