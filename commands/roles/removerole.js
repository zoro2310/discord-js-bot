const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removerole')
		.setDescription('Role Role of the mentioned user')
        .addUserOption(option => 
			option
				.setName('target')
				.setDescription('Select a user')
				.setRequired(true)
		)
        .addRoleOption(option => 
			option
				.setName('role')
				.setDescription('Select a role')
				.setRequired(true)
		),
	async execute(interaction) {
		if (!interaction.member.permissions.has("MANAGE_ROLES")){
			await interaction.reply(`No Perms`);
			return;
		}
        const member = interaction.options.getMember('target');
        const role = interaction.options.getRole('role');
		await interaction.reply(`Removed Role ${role} To ${member}`);
        await member.roles.remove(role);
	},
};