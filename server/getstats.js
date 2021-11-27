const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

module.exports = {
    name: "getstats",
    async execute(interaction, todo) {

        console.log("fetched");
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");

        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (interaction.guild.id == o_g.guild_id) {
                console.log("guild fetched");

                var total_channel_id = o_g.total_channel_id;
                var member_count=o_g.member_count;
                var guild=interaction.guild;
                var guild_id=guild.id;
                //get roleid of @everyone
                var everyone_role_id = guild.roles.cache.find(role => role.name === "@everyone").id;

                if(todo=="start" && total_channel_id=="0"){
                    //create a channel for total where no one can connect
                    var total_channel = await guild.channels.create(`Total: ${member_count}`, {
                        type: "GUILD_VOICE",
                        permissionOverwrites: [
                            {
                                id: everyone_role_id,
                                deny: ["CONNECT","MANAGE_CHANNEL"]
                            }
                        ]
                    });

                    //var total_channel = await guild.channels.create(`Total-${member_count}`, { type: "voice" });
                    total_channel_id = total_channel.id;
                    await dbo.collection("guilds").updateOne({ guild_id: guild_id }, { $set: { total_channel_id: total_channel_id } });
                    console.log("total channel created");
                    await interaction.reply("Started");
                }
                else if(todo=="start" && total_channel_id!="0"){
                    await interaction.reply("Already started");
                }
                else if(todo=="stop" && total_channel_id!="0"){
                    var total_channel = guild.channels.cache.find(channel => channel.id === total_channel_id);
                    await dbo.collection("guilds").updateOne({ guild_id: guild_id }, { $set: { total_channel_id: "0" } });
                    await total_channel.delete();
                    await interaction.reply("Stopped");
                }
                else if(todo=="stop" && total_channel_id=="0"){
                    await interaction.reply("Already stopped");
                }

                break;
            }
        }
        //client.close();
    }
}