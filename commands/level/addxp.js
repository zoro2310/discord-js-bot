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
        const user = interaction.options.getMember('user');
        const xp = interaction.options.getInteger('xp');
        //check if user is bot
        if (user.user.bot) {
            interaction.reply(`${user.user.username} is a bot!`);
            return;
        }
        else if (user) {
            await fun.execute(interaction, user, xp);
            interaction.reply(`Added ${xp} xp to ${user.displayName}`);
        }
    },
};