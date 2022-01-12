import { Client, Collection, Intents } from 'discord.js';
import * as fs from 'graceful-fs';
import botConfig from './src/config';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

// @ts-ignore
client.commands = new Collection();

const cmds: Array<any> = [];
const cmdFiles = fs.readdirSync('./src/commands').filter((f) => f.endsWith('.js'));
const evnFiles = fs.readdirSync('./src/events').filter((f) => f.endsWith('.js'));

for (const file of cmdFiles) {
    const cmd = require(`./src/commands/${file}`);
    cmds.push(cmd.default.data.toJSON());

    // @ts-ignore
    client.commands.set(cmd.default.data.name, cmd);
}

for (const file of evnFiles) {
    const evn = require(`./src/events/${file}`);

    if (evn.default.once) {
        client.once(evn.default.name, async (...args) => {
            await evn.default.execute(...args);
        });
    } else {
        client.on(evn.default.name, async (...args) => {
            await evn.default.execute(client, ...args);
        });
    }
}

console.log(`Logging in with token: ${botConfig.token}`);
client.login(botConfig.token);
