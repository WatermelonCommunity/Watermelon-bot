module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        client.user.setActivity('Bot en desarrollo.', { type: 'WATCHING' });
        console.log(`Inicializado como ${client.user.username}`);
    },
};