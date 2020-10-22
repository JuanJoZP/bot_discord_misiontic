/*
UTILIZA EL BUSCADOR DE CARACTERES Y PON: variab3ls_

CON ESE PALABRA DE REMITIRA A TODAS LAS VARIABLES QUE DEBES CAMBIAR POR LAS DE TU SERVIDOR
*/

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")
const prefix = config.prefix;
const usuarios = require("./warns.json");

const admin = "756000768317849692"; //ROL 1 DE ADMIN - variab3ls_
const mod = "768270744299503686";// ROL 2 DE ADMIN - variab3ls_
const canal_warns = "768266552478662657" //CANAL DONDE NOTIFICA LOS WARNS - variab3ls_

//Consola
client.once("ready", async msg =>{
    console.log('Warns Iniciado')
});

//COMPRUEBA SI EL USUARIO ESTA REGISTRADO EN LA DB
function usuariosWarneados (user) {
    try{
        if(!usuarios[user.id]) return false;
        else return true;
    } catch (e) {
        return false;
    }
}

//REGISTRAR USUARIOS EN LA BASE DE DATOS
function registrarWarns (user) {
    try{
        usuarios[user.id] = {
            warns: 0,
        }

        console.log(`${user.tag} fué registrado`);

        fs.writeFile("./warns.json", JSON.stringify(usuarios), (err) => {
            if(err) console.log(err);
        });

    } catch (e) {
        return;
    }
}

//APLICA EL WARNEO A EL USUARIO EN CUESTION, ACTUALIZA LA BASE DE DATOS, Y ENVIA EL MENSAJE AVISANDO QUE EL USUARIO FUE WARNEADO
function warneado (user, member, reason) {
    var warn = usuarios[user.id].warns;
    var limit = 2;
    var respuesta;
    var canal = "768657967678619649" //CAMBIAR POR EL CANAL DE BANEOS  - variab3ls_
    
    //cuando el usuario acumula 3 advertencias es baneado permanentemente
    if (warn == limit) {
        if (member) {
            member
            .ban({
                reason: reason
            })
            .then(() => {
                client.channels.cache.get(canal).send(`El usuario ${user} ha sido baneado.`);
            })
            .catch(err => {
                if (member.hasPermission("ADMINISTRATOR")) {
                    
                }
            });
            usuarios[user.id].warns = 0;
            fs.writeFile("./warns.json", JSON.stringify(usuarios), (err) => {
                   if(err) console.log(err);
            });
        
        }
    //cuando lleva menos de 3 warneos, se muestra el mensaje de warneo y se actualiza la base de datos
    } else {
        usuarios[user.id].warns = warn + 1;
        //|||||||||||||||EMBED
        const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('WARNS | MisionTic2 020')
        .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
        .setDescription(`<@${user.id}> ** | Ha recibido un warn ${warn + 1} debido a ${reason}. **`)
        .setThumbnail("https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png")
        .setTimestamp()
        .setFooter('©MinTic | 2020 | Esteban - Juanjo', 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
        //|||||||||||||||EMBED
        fs.writeFile("./warns.json", JSON.stringify(usuarios), (err) => {
            if(err) console.log(err);
        });
        
        client.channels.cache.get(canal_warns).send(embed);
    }
}

//REVISAR SI EL USUARIO ESTA REGISTRADO EN LA BASE DE DATOS
client.on('message', msg => {
    if (msg.author.bot) return;

    //llamada a funcion de registrar en la base de datos
    if (usuariosWarneados(msg.author)) return;
    else registrarWarns(msg.author);
});



//MENSAJE PARA WARNEAR
client.on("message", async message => {
    if (message.content.startsWith(`${prefix}warn`)) {
        if (message.member.roles.cache.get(admin) || message.member.roles.cache.get(mod)) { //AQUI SE AGREGAN MAS ROLES DE ADMINISTRADORES - variab3ls_
            var user = message.mentions.users.first();
            var reason = message.content.split(' ')[2]
            var member = message.guild.member(user);

            message.delete();
            if (!member.hasPermission("ADMINISTRATOR")) {
                warneado(user, member, reason);
            } else {
                message.reply(`No puede warnear a ${user}.`);
            }

        } else {
            message.delete();
            message.reply('No tienes permisos para realizar esta acción');
        }
    }
});

//TOKEN
client.login(config.token);