import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import token from "./env.json";

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

//@ts-ignore
client.commands = new Collection();
const commandFiles: string[] = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));
const eventFiles: string[] = fs.readdirSync("./src/events").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    //@ts-ignore
    client.commands.set(command.default.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    //@ts-ignore
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token.token);

//this does not work
