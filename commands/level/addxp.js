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
        const member = interaction.options.getMember('user');
        const xp = interaction.options.getInteger('xp');

        //get the role of the member
        const role = interaction.member.roles.cache.find(role => role.name === 'Admin');
        if (!role) {
            interaction.reply(`You dont have proper roles`);
            return;
        }
        

        //check if user is bot
        if (member.user.bot) {
            interaction.reply(`${member.user.username} is a bot!`);
            return;
        }
        else if (member) {
            await fun.execute(interaction, member, xp);
            interaction.reply(`Added ${xp} xp to ${member.displayName}`);
        }
    },
};