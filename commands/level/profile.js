const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Replies with Your server profile!'),
	async execute(interaction) {
		await interaction.reply('server profile!');
	},
};