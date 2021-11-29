const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require("../../server/getrank.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Replies with Server Ranks!')
		.addUserOption(option =>
			option
				.setName("user")
				.setDescription("The user to get the rank of")
		),
	async execute(interaction) {
		const user = interaction.options.getMember('user');
		fun.execute(interaction,user);
	},
};