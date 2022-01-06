export default {
    name: "interactionCreate",
    execute(interaction) {
        console.log(
            `${interaction.user.tag} en #${interaction.channel.name} ejecuto una interacción.`
        );
    },
};
