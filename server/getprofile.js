const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "getprofile",
    async execute(interaction) {

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");

        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (interaction.guildid == o_g.guild_id) {
                for (const o_u of o_g.users) {
                    if (interaction.user.id == o_u.user_id) {
                        //fetch the user data
                        var user_data = o_u;
                        //reply interaction with user data
                        const exampleEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Your Server Profile')
                            .setAuthor(interaction.user.username, interaction.user.avatarURL())
                            .addFields(
                                { name: 'XP', value: user_data.xp, inline: true },
                                { name: 'LEVEL', value: user_data.level, inline: true },
                                { name: 'WARNINGS', value: user_data.warnings, inline: true },
                            )

                        interaction.reply({embed: exampleEmbed});
                        break;
                    }
                }
                break;
            }
        }
        //client.close();
    }
}