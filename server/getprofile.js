const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

module.exports = {
    name: "getprofile",
    async execute(interaction, user) {

        console.log("fetched");
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");

        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (interaction.guild.id == o_g.guild_id) {
                console.log("guild fetched");
                for (const o_u of o_g.users) {
                    if (user.id == o_u.user_id) {
                        console.log("user fetched");
                        //fetch the user data
                        var user_data = o_u;
                        //reply interaction with user data
                        return user_data;
                    }
                }
                break;
            }
        }
        //client.close();
    }
}