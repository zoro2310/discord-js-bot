const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban the member!'),
	async execute(interaction) {
		await interaction.reply('ban!');
	},
};