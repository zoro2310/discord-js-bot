const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";
const { MessageEmbed } = require('discord.js');

function cal_lev(xp) {
    var level = 0;
    while (xp >= (level + 1) * 100) {
        level++;
    }
    return level;
}

module.exports = {
    name: "removexp",
    async execute(interaction, user, xp) {

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");
        var i=0,j=0;
        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (interaction.guild.id == o_g.guild_id) {
                console.log("guild fetched");
                for (const o_u of o_g.users) {
                    if (user.id == o_u.user_id) {
                        console.log("user fetched");
                        var xp_old = o_u.user_xp;
                        var lvl_old = o_u.user_level;
                        var xp_new = xp_old - xp;
                        var lvl_new = cal_lev(xp_new);

                        var user_structure = {
                            user_id: o_u.user_id,
                            user_xp: xp_new,
                            user_level: lvl_new,
                            user_last_message: o_u.user_last_message,
                            warnings: 0
                        };

                        result[i].users[j] = user_structure;
                        console.log(xp_old);
                        //update a data in mongo
                        var myquery = { guild_id: interaction.guild.id };
                        var newvalues = { $set: { users: result[i].users } };
                        dbo.collection("guilds").updateOne(myquery, newvalues, function (err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                        });
                        break;
                    }
                    j++;
                }
                break;
            }
            i++;
        }
        //client.close();
    }
}