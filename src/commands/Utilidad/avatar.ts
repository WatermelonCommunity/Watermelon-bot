import { CommandInteraction } from 'discord.js/typings/index.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra el avatar de un usuario.')
        .addUserOption((targ) => targ.setName('target').setDescription('El miembro a mostrar su avatar').setRequired(true)),
    run: async (interaction: CommandInteraction) => {
        const member: any = interaction.options.getUser('target');

        const embedAvatar = new MessageEmbed()
            .setColor('#F86761')
            .setTitle(`${member.username} Avatar`)
            .setDescription(
                `[Avatar Link](${member.displayAvatarURL({
                    size: 2048,
                    dynamic: true,
                    format: 'png'
                })})`
            )
            .setImage(member.avatarURL({ size: 2048, dynamic: true, format: 'png' }));

        interaction.reply({ embeds: [embedAvatar] });
    }
};
