const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

async function update_warning(message) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    var dbo = client.db("discord");
    var i = 0, j = 0;
    //get a data from mongo
    var result = await dbo.collection("guilds").find().toArray();
    console.log("data fetched");
    for (const o_g of result) {
        if (message.guild.id == o_g.guild_id) {
            console.log("guild fetched");
            for (const o_u of o_g.users) {
                if (message.author.id == o_u.user_id) {
                    console.log("user fetched");
                    var war_old = o_u.user_xp;
                    var war_new = war_old + 1;

                    result[i].users[j].warnings = war_new;
                    //update a data in mongo
                    var myquery = { guild_id: message.guild.id };
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


module.exports = {
    name: "checkmsg",
    async execute(message) {

        //checking for words that are not allowed
        const word_dit = ["hi", "hello"];
        for (const word of word_dit) {
            if (message.content.includes(word)) {
                await update_warning(message);
                await message.delete();
                await message.channel.send(`this ${word} is not allowed here`);
                return;
            }
        }

        //checking for links in the message
        const re = /^((https?):\/\/)?([w|W]{3}\.)?[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        if (re.test(message.content)) {
            await update_warning(message);
            await message.delete();
            await message.channel.send(`this link is not allowed here`);
            return;
        }
    }
}