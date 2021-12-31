module.exports = {
    name: "creater",
    async execute(interaction) {
        const guild = interaction.guild;
        const channel = interaction.channel;
        const channel_id = interaction.channelId;
        await interaction.reply("Follow the instruction for creating a reactionrole!");
        const timeout_sec=30;

        var chid;
        await channel.send("Enter the channel id of the channel you want to create the reactionrole in!").then(() => {
            channel.awaitMessages({ max: 1, time: timeout_sec*1000, errors: ['time'] })
                .then(message => {
                    message = message.first();
                    console.log(message.content);
                })
                .catch(collected => {
                    channel.send('Timeout');
                });
        });
    }
}