import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('Bot is ready!')

    const guildId = '716974738915852348'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application.commands
    }

    commands.create({
        name: 'ping',
        description: 'Replies with pong.'
    })

    commands.create({
        name: 'add',
        description: 'Returns the sum of two numbers',
        options: [
            {
                name: 'number-1',
                description: 'The first number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'number-2',
                description: 'The second number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: false
        })
    } else if (commandName === 'add') {
        const number_1 = options.getNumber('number-1')
        const number_2 = options.getNumber('number-2')

        await interaction.deferReply({
            ephemeral: false
        })

        interaction.editReply({
            content: `The sum of *${number_1}* and *${number_2}* is *${number_1 + number_2}*`,
        })
    }
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply('pong')
    }
})

client.login(process.env.TOKEN)