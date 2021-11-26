const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startstats')
		.setDescription('Start statistics for your server!'),
	async execute(interaction) {

		//get the role of the member
        const role = interaction.member.roles.cache.find(role => role.name === 'Admin');
        if (!role) {
            interaction.reply(`You dont have proper roles`);
            return;
        }

		await interaction.reply('ok started!');
	},
};