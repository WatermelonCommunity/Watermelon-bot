const { Client, Intents, Collection, MessageEmbed, Util } = require("discord.js");
const dotenv = require('dotenv').config();
const fs = require("fs");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});
const { comandos } = require(`${__dirname}/src/utils/handler/commands.js`);
const { eventos } = require(`${__dirname}/src/utils/handler/events.js`);

comandos(fs, client, Collection)
eventos(fs, client, MessageEmbed, Util)

client.login(process.env.TOKEN);

