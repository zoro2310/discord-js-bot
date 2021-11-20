const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Add Role to the mentioned user')
        .addUserOption(option => option.setName('target').setDescription('Select a user'))
        .addRoleOption(option => option.setName('role').setDescription('Select a role')),
	async execute(interaction) {
        const member = interaction.options.getMember('target');
        const role = interaction.options.getRole('role');
		await interaction.reply(`Added Role ${role} To ${member}`);
        await member.roles.add(role);
	},
};