const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'weather',
    async execute(message, args, client, Discord){
    const name = args.join(" ");
    const place = args.join("-");
    if (!place) {
      return message.reply(
        "<a:exclamationred:927018216285433907>**Por favor introduce el nombre de un País/Ciudad/Pueblo**"
      );
    }
    
    const link = `https://wttr.in/${place}.png?m`;
    const weblink = `https://wttr.in/${place}`;
    const embed = new MessageEmbed()
      .setTitle(`Tiempo para los próximos 3 días en ${name}`)
      .setImage(link)
      .setFooter("Wttr.in")
      .setColor("#F86761");
    message.reply({ embeds: [embed] });
    },
};