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
        const member = interaction.options.getMember('user');
        const xp = interaction.options.getInteger('xp');

        //get the role of the member
        const role = interaction.member.roles.cache.find(role => role.name === 'Admin');
        if (!role) {
            interaction.reply(`You dont have proper roles`);
            return;
        }

        if (member.user.bot) {
            interaction.reply(`${member.user.username} is a bot!`);
            return;
        }
        if (member) {
            await fun.execute(interaction, member, xp);
            interaction.reply(`Removed ${xp} xp from ${member.displayName}`);
        }
    },
};