const fun = require('../server/updatemember.js');

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(member) {
        var todo="remove";
        console.log("member removed");
        await fun.execute(member,todo);
    }
}