import { CommandInteraction } from 'discord.js/typings/index.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Devuelve el ping/latencia de el bot actual.'),
    run: async (interaction: CommandInteraction) => {
        // @ts-ignore
        const apiPing = Math.round(interaction.client.ws.ping);

        interaction.reply({
            content: `Ping del bot: ${apiPing}ms\nLatencia de mensajes: ${NaN}ms`, // Soon I will do this
            ephemeral: false
        });
    }
};
