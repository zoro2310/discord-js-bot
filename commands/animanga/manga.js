const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require(`../../animanga/getmanga.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manga')
		.setDescription('Search for a manga')
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