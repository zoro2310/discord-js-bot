const { SlashCommandBuilder } = require('@discordjs/builders');
const funcreate = require('../../reactionmanager/creater.js');
const funremove = require('../../reactionmanager/remover.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reactionrole')
		.setDescription('Create/Delete reactionrole!')
		.addStringOption(option =>
			option
				.setName('category')
				.setDescription('Select to create or delete reactionrole')
				.setRequired(true)
				.addChoice('CREATE', 'create')
				.addChoice('REMOVE', 'remove')
		),
	async execute(interaction) {
		const choice = interaction.options.getString('category');
		if (choice === "create") {
			funcreate.execute(interaction);
		}
	},
};