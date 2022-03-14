const { Client, Intents} = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TOKEN;

const config = require('./config.json');
const prefix = config.prefix;
const dev_guild = config.dev_guild;

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: ["CHANNEL"]
});

client.on('ready', () => {
    let handler = require('./command-handler.js');

    handler(client, prefix, dev_guild);
    console.log(client.application);
});

client.login(token);