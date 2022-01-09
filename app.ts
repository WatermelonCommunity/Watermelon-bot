import { Client, Collection, CommandInteraction, Intents } from 'discord.js';
import * as fs from 'fs';
import token from './env.json';

const client: Client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

// @ts-ignore
client.commands = new Collection();
const commandFiles: string[] = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));
const eventFiles: string[] = fs.readdirSync('./src/events').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    const command = require(`./src/commands/${file}`);
    client?.application?.commands.set(command.default.data.name, command);
});

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

client.login(token.token);
