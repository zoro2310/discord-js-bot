const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removerole')
		.setDescription('Role Role of the mentioned user')
        .addUserOption(option => option.setName('target').setDescription('Select a user'))
        .addRoleOption(option => option.setName('role').setDescription('Select a role')),
	async execute(interaction) {
        const member = interaction.options.getMember('target');
        const role = interaction.options.getRole('role');
		await interaction.reply(`Added Role ${role} To ${member}`);
        await member.roles.remove(role);
	},
};