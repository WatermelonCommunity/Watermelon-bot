module.exports.eventos = function (fs, client, MessageEmbed, Util) {
   const path = require('path');

    const eventFiles = fs.readdirSync(__dirname + "/" + `../../events/`).filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const event = require(path.join(__dirname, "../../events/", file));
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client, MessageEmbed, Util));
      }
    }
  };