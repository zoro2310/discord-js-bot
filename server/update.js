const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";


function cal_lev(xp) {
    var level = 0;
    while (xp >= (level + 1) * 100) {
        level++;
    }
    return level;
}


module.exports = {
    name: "update",
    async execute(message) {
        var user_structure = {
            user_id: message.author.id,
            user_xp: 0,
            user_level: 0,
            user_last_message: message.id,
            warnings: 0
        };

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        var dbo = client.db("discord");

        var i=0, j=0;
        //get a data from mongo
        var result = await dbo.collection("guilds").find().toArray();
        console.log("data fetched");
        for (const o_g of result) {
            if (message.guild.id == o_g.guild_id) {
                for (const o_u of o_g.users) {
                    if (message.author.id == o_u.user_id) break;
                    j++;
                }
                break;
            }
            i++;
        }
        user_structure.user_xp=result[i].users[j].user_xp+1;
        user_structure.user_level=cal_lev(user_structure.user_xp);
        user_structure.user_last_message=message.id;

        if(user_structure.user_level>result[i].users[j].user_level){
            await message.reply("You have leveled up to level "+user_structure.user_level+"!");
        }

        result[i].users[j] = user_structure;


        //update a data in mongo
        var myquery = { guild_id: message.guild.id };
        var newvalues = { $set: { users: result[i].users } };
        dbo.collection("guilds").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
        //client.close();
    }
}