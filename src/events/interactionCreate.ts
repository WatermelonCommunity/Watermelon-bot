import { Client } from "discord.js";

export default {
    name: 'interactionCreate',
    once: false,
    async execute(client: Client, interaction: any) {
        const cmd = interaction.client.commands.get(interaction.commandName);
        if (!cmd) return;

        try {
            await cmd.default.run(interaction);
        } catch (err) {
            console.error(err);
            return interaction.reply({
                content: "An error ocurred",
                ephemeral: true
            });
        }
    }
};
