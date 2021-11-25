const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startstats')
		.setDescription('Start statistics for your server!'),
	async execute(interaction) {
		await interaction.reply('ok started!');
	},
};