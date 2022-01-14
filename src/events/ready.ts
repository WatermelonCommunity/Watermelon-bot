import { Client } from 'discord.js';

export default {
    name: 'ready',
    once: true,
    execute(client: Client) {
        client?.user?.setActivity('Bot en desarrollo.', { type: 'WATCHING' });
        console.log(`Inicializado como ${client?.user?.username}`);
    }
};
