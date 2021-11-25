const { SlashCommandBuilder } = require('@discordjs/builders');
const fun = require(`../../server/getprofile.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Replies with Your server profile!'),
	async execute(interaction) {
		fun.execute(interaction);
	},
};