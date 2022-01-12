import { CommandInteraction } from 'discord.js/typings/index.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Returns current client ping'),
    run: async (interaction: CommandInteraction) => {
        // @ts-ignore
        const apiPing = Math.round(interaction.client.ws.ping);

        interaction.reply({
            content: `Pong!\nClient: NaNms\nAPI: ${apiPing}ms`,
            ephemeral: false
        });
    }
};
