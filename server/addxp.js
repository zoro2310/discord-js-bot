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
    name: "addxp",
    async execute(interaction, user, xp) {

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");

        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (interaction.guildid == o_g.guild_id) {
                for (const o_u of o_g.users) {
                    if (user.id == o_u.user_id) {
                        var xp_old = o_u.xp;
                        var lvl_old = o_u.lvl;
                        var xp_new = xp_old + xp;
                        var lvl_new = cal_lev(xp_new);

                        var user_structure = {
                            user_id: o_u.user_id,
                            user_xp: xp_new,
                            user_level: lvl_new,
                            user_last_message: o_u.user_last_message,
                            warnings: 0
                        };


                        //update a data in mongo
                        var myquery = { guild_id: message.guild.id };
                        var newvalues = { $set: { "users.$": user_structure } };
                        dbo.collection("guilds").updateOne(myquery, newvalues, function (err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                        });
                        interaction.reply(`added`);
                        break;
                    }
                }
                break;
            }
        }
        //client.close();
    }
}