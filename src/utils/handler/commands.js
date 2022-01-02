
module.exports.comandos = function (fs, client, Collection) {
  const path = require('path');

    client.commands = new Collection();
    const commandFolder = fs.readdirSync(path.join(__dirname, "../../commands"));
    for (const folder of commandFolder) {
      const commandFile = fs.readdirSync(path.join(__dirname, "../../commands/", folder));
      for (const file of commandFile) {
        const command = require(path.join(__dirname, `../../commands/${folder}/${file}`));
        client.commands.set(command.name, command);
      }
    }
  };