const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    async execute(message, args, Util, client, Discord){
        let user = message.mentions.users.first() || message.author;
        let embedAvatar = new MessageEmbed()
        .setColor('#F86761')
        .setTitle(`${user.username} Avatar`)
        .setDescription(`[Avatar Link](${user.displayAvatarURL({ 
        size: 2048,
        dynamic: true,
        format: 'png',
         })})`).setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

         message.reply({ embeds: [embedAvatar] });
    },
};