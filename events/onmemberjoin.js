const fun = require('../server/updatemember.js');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(member) {
        var todo="add";
        console.log("member joined");
        await fun.execute(member,todo);
    }
}