import { Client, Collection, CommandInteraction, Intents, Message } from 'discord.js';
import * as fs from 'fs';
import botConfig from './src/config';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

// @ts-ignore
client.commands = new Collection();
const commandFiles: string[] = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));
const eventFiles: string[] = fs.readdirSync('./src/events').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    const command = require(`./src/commands/${file}`);
    client?.application?.commands.set(command.default.data.name, command);
});

for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    client.on(event.default.name, event.default.execute);
}

client.on('INTERACTION_CREATE', async (interaction: CommandInteraction) => {
    const isCommand: boolean = interaction.isCommand();
    if (!isCommand) return;
    // @ts-ignore
    const command = await client?.application?.commands.get(interaction.commandName);

    try {
        await command!.default.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});

interface TEvent {
    name: string;
    once: boolean;
    execute(x: any): void;
}

for (const file of eventFiles) {
    const event: TEvent = require(`./src/events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute([...args]));
    } else {
        client.on(event.name, (...args) => event.execute([...args]));
    }
}

client.on('messageCreate', (message: Message) => {
    console.log(message);
});

console.log(`Logging in with token: ${botConfig.token}`);
client.login(botConfig.token);
