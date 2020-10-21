const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")
const prefix = config.prefix;
const usuarios = require("./warns.json");

const admin = "756000768317849692";
const mod = "768270744299503686";

//Consola
client.once("ready", async msg =>{
    console.log('Warns Iniciado')
});

function usuariosWarneados (user) {
    try{
        if(!usuarios[user.id]) return false;
        else return true;
    } catch (e) {
        return false;
    }
}

client.on("message", message => {
    if (message.content.startsWith('!warn')) {
        if (!member.roles) {
            message.reply('No tienes permisos para realizar esta acción')
            return
        } else {
        
        }
    }
})