const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mping')
		.setDescription('Replies with mPong!'),
	async execute(interaction) {
		await interaction.reply('mPong!');
	},
};