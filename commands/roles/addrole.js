const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Add Role to the mentioned user')
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
		if (!interaction.memberPermissions.has("MANAGE_ROLES")){
			await interaction.reply(`No Perms`);
			return;
		}
        const member = interaction.options.getMember('target');
        const role = interaction.options.getRole('role');
		await interaction.reply(`Added Role ${role} To ${member}`);
        await member.roles.add(role);
	},
};