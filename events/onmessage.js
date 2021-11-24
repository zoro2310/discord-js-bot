const fs = require("fs");

const ser_fun = [];

const eventFiles = fs.readdirSync('./server').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const fun = require(`../server/${file}`);
    ser_fun.push(fun);
}

function get_fun(name) {
    for (const fun of ser_fun) {
        if (fun.name == name) {
            return fun;
        }
    }
}

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (message.author.bot) return;
        console.log(`${message.content}`);
        //check if the message is send by bot
        await get_fun("checkpresence").execute(message);
        await get_fun("update").execute(message);
    }
}