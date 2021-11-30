const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require(`../../search/getanime.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Search for an anime in kitsu.io')
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