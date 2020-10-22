const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

//Consola
client.once("ready", async msg =>{
    console.log(`Sesion iniciada como: ${user.tag}`)
});

//token
client.login(config.token);