export default {
    name: 'interactionCreate',
    execute(interaction: any) {
        console.log(`${interaction.user.tag} en #${interaction.channel.name} ejecuto una interacción.`);
    }
};
