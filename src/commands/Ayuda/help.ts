import { CommandInteraction } from 'discord.js/typings/index.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('help').setDescription('Devuelve un embed con todos los comandos del bot.'),
    run: async (interaction: CommandInteraction) => {
        const helpEmbed = new MessageEmbed()
            .setColor('#F86761')
            .setTitle('Comandos de Watermelonbot.')
            .setURL('https://github.com/WatermelonCommunity/Watermelon-bot')
            .setDescription('Soy el Bot oficial de Watermelon Code.')
            .setThumbnail(
                'https://media.discordapp.net/attachments/888939883471728690/925449636850839622/watermeloncode-logo.png?width=115&height=115'
            )
            .addField(
                '__Utilidad__',
                '<a:info:927044960719618068>userinfo\n<a:info:927044960719618068>avatar\n<a:info:927044960719618068>weather\n<a:info:927044960719618068>ping\n<a:info:927044960719618068>serverinfo\n<a:info:927044960719618068>suggest'
            )
            .addField(
                '__Moderación__',
                '<a:info:927044960719618068>warn\n<a:info:927044960719618068>mute\n<a:info:927044960719618068>unmute\n<a:info:927044960719618068>ban\n<a:info:927044960719618068>kick\n<a:info:927044960719618068>unban'
            )
            .addField(
                '__Herramientas__',
                '<a:info:927044960719618068>nuke\n<a:info:927044960719618068>stafflist\n<a:info:927044960719618068>welcome\n<a:info:927044960719618068>clear'
            )
            .addField('\u200b', '`Slash Commands.`')
            .setFooter({
                text: 'Desarrollado por WatermelonCommunity',
                iconURL:
                    'https://media.discordapp.net/attachments/888939883471728690/925449636850839622/watermeloncode-logo.png?width=115&height=115'
            });

        interaction.reply({ embeds: [helpEmbed] });
    }
};
