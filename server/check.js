const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

module.exports = {
    name: "checkpresence",
    async execute(message) {
        var user_structure = {
            user_id: message.author.id,
            user_xp: 0,
            user_level: 0,
            user_last_message: message.id,
            warnings: 0
        };

        var boolg = false, boolu = false;

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");

        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (message.guild.id == o_g.guild_id) {
                boolg = true;
                for (const o_u of o_g.users) {
                    if (message.author.id == o_u.user_id) {
                        boolu = true;
                        break;
                    }
                }
                break;
            }
        }

        if (!boolg) {
            var myobj = {
                guild_id: message.guild.id,
                member_count: message.guild.memberCount,
                total_channel_id: 0,
                users: [user_structure]
            };
            dbo.collection("guilds").insertOne(myobj, (err, res) => {
                if (err) throw err;
                console.log("1 document inserted");
            });
        }

        else if (!boolu) {
            var myquery = { guild_id: message.guild.id };
            var newvalues = { $push: { users: user_structure } };
            dbo.collection("guilds").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
            });
        }
        //client.close();
    }
}