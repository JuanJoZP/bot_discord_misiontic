const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const levels = require("./levels.js")

client.on("message", msg =>{
    if(msg.content == "#prueba") {
        msg.channel.send("Bot encendido.");
    }
});

client.once("ready", async msg =>{
    console.log(`Iniciando como ${client.user.tag}`)
});

client.login(config.token);