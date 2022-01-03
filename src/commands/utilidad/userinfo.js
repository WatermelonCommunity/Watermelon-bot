const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    async execute(message, args, Util, client, Discord){
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "None",
            "DISCORD_EMPLOYEE": "Discord Employee",
            "DISCORD_PARTNER": "Discord Partner",
            "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
            "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early Supporter",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Verified Bot",
            "EARLY_VERIFIED_DEVELOPER": "Early Verified Bot Developer"
        };
        var bot = {
            "true": "Yes",
            "false": "No"
        };
        const user = new MessageEmbed()
        .setAuthor(`Información del Usuario`, mention.user.avatarURL())
        .setThumbnail(usericon)
        .addField(`Información General`, `Nombre: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nApodo: \`${nick}\``)
        .addField(`Perfil`, `Insignias: \`${flags[mention.user.flags.toArray().join(", ")]}\`\nBot: \`${bot[mention.user.bot]}\``)
        .addField(`Información relacionada con el Servidor`, `Roles: <@&${mention._roles.join(">  <@&")}> \nPermisos: \`${finalPermissions.join(', ')}\``)
        .addField(`Cuenta`, `Cuenta creada en: \n\`${moment(mention.user.createdAt).format("dddd, MMMM DD YYYY, h:mm:ss A")}\` \nMiembro del servidor desde: \n\`${moment(mention.joinedAt).format("dddd, MMMM DD YYYY, h:mm:ss A")}\``)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
        .setTimestamp()
        .setColor("#F86761");

        message.reply({ embeds: [user] });
    },
};