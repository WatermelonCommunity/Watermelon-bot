import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'graceful-fs';

require('dotenv').config();
const token: string = process.env.BOT_TOKEN;
const cmds: Array<any> = [];
const cmdFiles = fs.readdirSync('./src/commands').filter((f) => f.endsWith('.js'));
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        for await (const file of cmdFiles) {
            const cmd = require(`./src/commands/${file}`);
            cmds.push(cmd.default.data.toJSON());
        }

        await rest.put(Routes.applicationGuildCommands('926293354294181959', '926296573959344188'), { body: cmds });

        console.log('Slash commands (/) se han cargado al servidor del bot.');
    } catch (error) {
        console.error(error);
    }
})();
