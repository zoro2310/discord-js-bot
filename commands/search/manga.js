const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require(`../../search/getmanga.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manga')
		.setDescription('Search for a manga in kitsu.io')
        .addStringOption(option =>
			option
				.setName('name')
				.setDescription('Enter the name of user')
		),
	async execute(interaction) {
        const name = interaction.options.getString('name');
        fun.execute(interaction,name);
	},
};