const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require(`../../server/addxp.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addxp')
        .setDescription('Add xp to the mentioned user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user').setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('xp')
                .setDescription('The amount of xp to add').setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.getOption('user');
        const xp = interaction.getOption('xp');
        fun.execute(interaction, user, xp);
    },
};