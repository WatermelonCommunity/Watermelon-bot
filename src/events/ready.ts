import { Client } from 'discord.js';

export default {
    name: 'ready',
    once: true,
    execute(client: Client) {
        console.log(`Listo! iniciado en ${client?.user?.tag}`);
    }
};
