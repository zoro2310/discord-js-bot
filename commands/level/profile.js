const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require(`../../server/getprofile.js`);
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Replies with Your server profile!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user')
		),
	async execute(interaction) {
		console.log("trying");
		var user = interaction.options.getMember('user');
		if (!user) {
			user_data = await fun.execute(interaction, interaction.user);
		}
		else {
			user_data = await fun.execute(interaction, user);
			user = interaction.user;
		}
		const user_xp = "" + user_data.user_xp;
		const user_level = "" + user_data.user_level;
		const warnings = "" + user_data.warnings;
		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Your Server Profile')
			.setAuthor("user.username")
			.addFields(
				{ name: 'XP', value: user_xp, inline: true },
				{ name: 'LEVEL', value: user_level, inline: true },
				{ name: 'WARNINGS', value: warnings, inline: true },
			);
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};