const { Client, Collection, Intents } = require('discord.js');
const fs=require("fs");

//Declaring Intents
const client= new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES
      ]
})


//Calling Token
const { token } = require("./config.json");


// Get all commands and put it in client.commands
const commands = [];
client.commands = new Collection();
const cmddir = fs.readdirSync('./commands');
for(const dir of cmddir){
    const commandFile = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    for(const file of commandFile){
        const command = require(`./commands/${dir}/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
}


//EVENT HANDLER
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith('.js'));
for( const file of eventFiles){
    const event = require(`./events/${file}`);

    if(event.once){
        client.once(event.name,(...args)=>event.execute(...args,commands));
    }else{
        client.on(event.name,(...args)=>event.execute(...args,commands));
    }
}


// Token
client.login(token);