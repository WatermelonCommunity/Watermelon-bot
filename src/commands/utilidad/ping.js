const { MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: 'ping',

  /**
   * @param {Client} client
   */
  
    async execute(message, args, client){
        let start = Date.now();

        let messageLatency = new MessageEmbed()
        .setDescription("Mira mi latencia!.")
        .setColor("#F86761")
     
        message.channel.send({ embeds: [messageLatency] }).then(m => {
       
       let end = Date.now();
       
       let pingEmbed = new MessageEmbed()
       .setAuthor("Ping!", message.author.avatarURL())
       .addField(`Ping del bot ${client.ws.ping}ms`, true) //TODO: Arreglar esto.
       .addField("Latencia de mensajes", end - start + "ms", true)
       .setColor("#F86761");
       m.edit({ embeds: [pingEmbed] }).catch(e => message.channel.send(e))
     })
    },
};