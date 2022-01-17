import { CommandInteraction } from 'discord.js/typings/index.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import moment from 'moment';
import { MessageEmbed } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Muestra información de un usuario.')
        .addUserOption((tg) => tg.setName('target').setDescription('El miembro a mostrar su informacion').setRequired(true)),
    run: async (interaction: CommandInteraction) => {
        const permissions: any = {
            ADMINISTRATOR: 'Administrator',
            MANAGE_GUILD: 'Manage Server',
            MANAGE_ROLES: 'Manage Roles',
            MANAGE_CHANNELS: 'Manage Channels',
            KICK_MEMBERS: 'Kick Members',
            BAN_MEMBERS: 'Ban Members',
            MANAGE_NICKNAMES: 'Manage Nicknames',
            MANAGE_EMOJIS: 'Manage Emojis',
            MANAGE_WEBHOOKS: 'Manage Webhooks',
            MANAGE_MESSAGES: 'Manage Messages',
            MENTION_EVERYONE: 'Mention Everyone'
        };

        const member: any = interaction.options.getUser('target');
        const nick = member.nickname === null ? 'None' : member.nickname;
        // const roles = member.roles.cache.get === '' ? 'None' : member.roles.cache.get; // ! This doesn't work.
        const usericon = member.user.avatarURL;
        const mentionPermissions = member.permissions.toArray() === null ? 'None' : member.permissions.toArray();
        const finalPermissions = [];

        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }

        const flags: any = {
            '': 'None',
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'Hypesquad Events',
            HOUSE_BRILLIANCE: 'HypeSquad Brilliance',
            HOUSE_BRAVERY: 'HypeSquad Bravery',
            HOUSE_BALANCE: 'HypeSquad Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            VERIFIED_BOT: 'Verified Bot',
            EARLY_VERIFIED_DEVELOPER: 'Early Verified Bot Developer'
        };

        const bot: any = {
            true: 'Si',
            false: 'No'
        };

        const user = new MessageEmbed()
            .setAuthor(`Información del Usuario`, member.user.avatarURL())
            .setThumbnail(usericon)
            .addField(
                `Información General`,
                `Nombre: \`${member.user.username}\` \nTag: \`${member.user.discriminator}\` \nApodo: \`${nick}\``
            )
            .addField(
                `Perfil`,
                `Insignias: \`${flags[member.user.flags.toArray().join(', ')]}\`\nBot: \`${bot[member.user.bot]}\``
            )
            .addField(
                `Información relacionada con el Servidor`,
                `Roles: <@&${member._roles.join('>  <@&')}> \nPermisos: \`${finalPermissions.join(', ')}\``
            )
            .addField(
                `Cuenta`,
                `Cuenta creada en: \n\`${moment(member.user.createdAt).format(
                    'dddd, MMMM DD YYYY, h:mm:ss A'
                )}\` \nMiembro del servidor desde: \n\`${moment(member.joinedAt).format('dddd, MMMM DD YYYY, h:mm:ss A')}\``
            )
            .setThumbnail(member.user.avatarURL())
            .setFooter(`ID: ${member.user.id}`, member.user.avatarURL())
            .setTimestamp()
            .setColor('#F86761');

        interaction.reply({ embeds: [user] });
    }
};
