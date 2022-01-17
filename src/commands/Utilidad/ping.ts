import { CommandInteraction } from 'discord.js/typings/index.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Devuelve el ping de el bot actual.'),
    run: async (interaction: CommandInteraction) => {
        const apiPing = Math.round(interaction.client.ws.ping);

        const pingEmbed = new MessageEmbed()
            .setColor('#F86761')
            .addField('🏓 Pong!', `Ping: **${apiPing}ms**`)
            .setThumbnail(
                'https://media.discordapp.net/attachments/888939883471728690/925449636850839622/watermeloncode-logo.png?width=115&height=115'
            );

        interaction.reply({ embeds: [pingEmbed] });
    }
};
