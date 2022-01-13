import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'graceful-fs';

require('dotenv').config();
const token: string = process.env.BOT_TOKEN;
const cmds: Array<any> = [];
const cmdFolders = fs.readdirSync('./src/commands');
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve, reject) => {
            try {
                for await (const folder of cmdFolders) {
                    const files = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

                    files.forEach((file) => {
                        const cmd = require(`./src/commands/${folder}/${file}`);
                        cmds.push(cmd.default.data.toJSON());
                    });
                }

                resolve('Slash commands (/) se han cargado al servidor del bot');
            } catch (err) {
                reject(err);
            }
        }).then(async (resp) => {
            await rest.put(Routes.applicationGuildCommands('926293354294181959', '926296573959344188'), { body: cmds });
            console.log(resp);
        });
    } catch (error) {
        console.error(error);
    }
})();
