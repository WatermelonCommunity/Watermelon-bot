const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    async execute(message, args, Util, client, Discord){
        const Target = message.mentions.users.first() || message.author;
        const Member = message.guild.members.fetch(Target.id);
        console.log(message.mentions);
        
         const userinfoEmbed = new MessageEmbed()
           .setAuthor(`${Target.tag}`, Target.displayAvatarURL({ dynamic: true }))
           .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
           .setColor('#F86761')
           .setTitle('Información')
           .addField("Id:", `${Target.id}`, false)
           .addField("Cuenta creada:" , `${moment(Target.createdAt).format('MMMM DD YYYY, h:mm:ss a')}`)
           .addField("Miembro del servidor desde:" , `${moment(Member.joinedAt).format('MMMM DD YYYY, h:mm:ss a')}`)
        //    .addField('Roles:', `${Member.role.cache.map(r => r).join(' ').replace("@everyone"), " "}`)

           message.reply({ embeds: [userinfoEmbed] });
    },
};