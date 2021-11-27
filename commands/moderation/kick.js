const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick the member!')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Select a user')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Set the reason for the kick')
		),
	async execute(interaction) {
		if (!interaction.memberPermissions.has("KICK_MEMBERS")) {
			await interaction.reply(`No Perms`);
			return;
		}
		const member = interaction.options.getMember('target');
		var reason = interaction.options.getString('reason');

		if(!reason) {
			reason = "No reason given";
		}

		await interaction.reply(`Kicked ${member} due to ${reason}`);
		await member.kick({ reason });
	},
};