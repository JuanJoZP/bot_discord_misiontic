const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")
const prefix = config.prefix;
const usuarios = require("./users_levels.json");
const channel_levels_id = "766345989602410557";

//Consola
client.once("ready", async msg =>{
    console.log('Niveles iniciado')
});

 //REGISTRAR USUARIOS
function usuarioRegistrado (user) {
    try{
        if(!usuarios[user.id]) return false;
        else return true;
    } catch (e) {
        return false;
    }
}

function registrarUsuario (user) {
    try{
        usuarios[user.id] = {
            nivel: 1,
            xp: 0,
        }

        console.log(`Datos creados para ${user.tag}`);

        fs.writeFile("./users_levels.json", JSON.stringify(usuarios), (err) => {
            if(err) console.log(err);
        });

    } catch (e) {
        return;
    }
}

//PEDIR NIVEL Y XP
function verNivel (user, msg) {
    var nivel = usuarios[user.id].nivel
}



//token
client.login(config.token);