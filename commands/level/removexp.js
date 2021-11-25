const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require(`../../server/removexp.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removexp')
        .setDescription('Remove xp from the mentioned user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user').setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('xp')
                .setDescription('The amount of xp to remove').setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const xp = interaction.options.getInteger('xp');
        if (user.user.bot) {
            interaction.reply(`${user.user.username} is a bot!`);
            return;
        }
        if (user) {
            await fun.execute(interaction, user, xp);
            interaction.reply(`Removed ${xp} xp from ${user.displayName}`);
        }
    },
};