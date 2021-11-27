const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

module.exports = {
    name: "updatemember.js",
    async execute(member, todo) {

        console.log("fetched");
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");

        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (member.guild.id == o_g.guild_id) {
                console.log("guild fetched");
                if (todo == "add") {
                    //update member_count in mongo
                    var new_member_count = member.guild.memberCount;
                    var newvalues = { $set: { member_count: new_member_count } };
                    await dbo.collection("guilds").updateOne({ guild_id: o_g.guild_id }, newvalues);

                    //msg in system message channel
                    var system_channel = member.guild.systemChannel;
                    if (system_channel) {
                        system_channel.send(`${member.user.username} joined the server`);
                    }
                    else {
                        console.log("system channel not found");
                    }

                    //update values in total channel
                    if (o_g.total_channel_id != "0") {
                        var total_channel = member.guild.channels.cache.find(channel => channel.id === o_g.total_channel_id);
                        if (total_channel) {
                            total_channel.setName(`Total: ${new_member_count}`);
                        }
                    }
                    console.log("member count updated");
                }
                else if (todo == "remove") {
                    //update member_count in mongo
                    var new_member_count = member.guild.memberCount;
                    var newvalues = { $set: { member_count: new_member_count } };
                    await dbo.collection("guilds").updateOne({ guild_id: o_g.guild_id }, newvalues);

                    //update values in total channel
                    if (o_g.total_channel_id != "0") {
                        var total_channel = member.guild.channels.cache.find(channel => channel.id === o_g.total_channel_id);
                        if (total_channel) {
                            total_channel.setName(`Total: ${new_member_count}`);
                        }
                    }

                    //remove member from mongo
                    var newvalues = { $pull: { users: { user_id: member.id } } };
                    await dbo.collection("guilds").updateOne({ guild_id: o_g.guild_id }, newvalues);
                    console.log("member removed");

                    console.log("member count updated");
                }
                break;
            }
        }
        //client.close();
    }
}