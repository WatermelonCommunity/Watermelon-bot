export default {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Listo! iniciado en ${client.user.tag}`);
    },
};
