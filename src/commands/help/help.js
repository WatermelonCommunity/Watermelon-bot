module.exports = {
    name: 'help',
    async execute(message, args, Util, client, Discord){
        const helpMessage = {
            color: '#F86761',
            title: 'Comandos de Watermelonbot.',
            url: 'https://github.com/WatermelonCommunity/Watermelon-bot',
            description: 'Soy el Bot oficial de Watermelon Code.\n Usa `w!commandinfo <comando>` para ver informacion de un comando.',
            thumbnail: {
                url: 'https://media.discordapp.net/attachments/888939883471728690/925449636850839622/watermeloncode-logo.png?width=115&height=115'
            },
            fields: [
                {
                  name: '__Utilidad__',
                  value: '<a:info:927044960719618068>userinfo\n<a:info:927044960719618068>avatar\n<a:info:927044960719618068>climate\n<a:info:927044960719618068>ping\n<a:info:927044960719618068>serverinfo\n<a:info:927044960719618068>suggest',
                },
                {
                  name: '__Moderación__',
                  value: '<a:info:927044960719618068>warn\n<a:info:927044960719618068>mute\n<a:info:927044960719618068>ban\n<a:info:927044960719618068>kick\n<a:info:927044960719618068>unban'
                },
                {
                  name: '__Herramientas__',
                  value: '<a:info:927044960719618068>commandinfo\n<a:info:927044960719618068>stafflist\n<a:info:927044960719618068>welcome\n<a:info:927044960719618068>clear', 
                },
                {
                    name: '\u200b',
                    value: '__Prefix:__ `w!`',
                    inline: false,
                },
            ],
            footer: {
                text: 'Desarrollado por WatermelonCommunity',
                icon_url: 'https://media.discordapp.net/attachments/888939883471728690/925449636850839622/watermeloncode-logo.png?width=115&height=115',
            }
        };

        message.channel.send({ embeds: [helpMessage]});
    },
};