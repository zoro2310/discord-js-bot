const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban the member!')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Select a user')
				.setRequired(true)
		)
		.addIntegerOption(option =>
			option
				.setName('days')
				.setDescription('Set the number of days to ban for')
		)
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Set the reason for the ban')
		),
	async execute(interaction) {
		if (!interaction.memberPermissions.has("BAN_MEMBERS")) {
			await interaction.reply(`No Perms`);
			return;
		}
		const member = interaction.options.getMember('target');
		var days = interaction.options.getInteger('days');
		var reason = interaction.options.getString('reason');

		if(!days) {
			days = 1;
		}
		if(!reason) {
			reason = "No reason given";
		}

		await interaction.reply(`Banned ${member} for ${days} days due to ${reason}`);
		await member.ban({ days, reason });
	},
};