const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require('../../server/getstats.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startstats')
		.setDescription('Start/Stop statistics for your server!')
		.addStringOption(option =>
			option
				.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoice('START', 'start')
				.addChoice('STOP', 'stop')
		),
	async execute(interaction) {

		//get the role of the member
		const role = interaction.member.roles.cache.find(role => role.name === 'Admin');
		const todo = interaction.options.getString('category');
		if (!role) {
			interaction.reply(`You dont have proper roles`);
			return;
		}

		await fun.execute(interaction,todo);
	},
};