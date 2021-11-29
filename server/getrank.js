const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

module.exports = {
    name: "getprofile",
    async execute(interaction, user) {
        var rank_dict = [];

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
                    console.log("user fetched");
                    //fetch the user data
                    var user_id = o_u.user_id;
                    var xp = o_u.user_xp;
                    rank_dict.push([user_id, xp]);
                }
            }
        }

        var temp = rank_dict;
        //sort rank_dict
        temp.sort(function (first, second) {
            return second[1] - first[1];
        });
        for(var i=0;i<temp.length;i++){
            console.log(temp[i]);
        }
        await interaction.reply(`${temp[0]}`);


        //client.close();
    }
}