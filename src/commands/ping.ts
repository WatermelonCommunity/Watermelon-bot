import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    async execute(interacion) {
        await interacion.reply("Pong!");
    },
};
