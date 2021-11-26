const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick the member!'),
	async execute(interaction) {
		await interaction.reply('kick!');
	},
};