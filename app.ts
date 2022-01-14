import { Client, Collection, Intents } from 'discord.js';
import * as fs from 'graceful-fs';
import botConfig from './src/config';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

// @ts-ignore
client.commands = new Collection();
// @ts-ignore
client.categorys = new Collection();

const cmds: Array<any> = [];
fs.readdirSync('./src/commands').forEach((dir) => {
    const files = fs.readdirSync(`./src/commands/${dir}`).filter((file) => file.endsWith('.js'));

    files.forEach((file) => {
        const cmd = require(`./src/commands/${dir}/${file}`);

        // @ts-ignore
        client.commands.set(cmd.default.data.name, cmd);
        // @ts-ignore
        client.categorys.set(cmd.default.data.name, dir);
        cmds.push(cmd);
    });
});

const evnFiles = fs.readdirSync('./src/events').filter((f) => f.endsWith('.js'));

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

client.login(botConfig.token);
