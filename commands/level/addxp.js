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
        fun.execute(interaction, interaction.getUserOption('user'), interaction.getIntegerOption('xp'));
    },
};