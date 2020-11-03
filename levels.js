const fs = require("fs")
const usuarios = require("./users_levels.json");
const Discord = require('discord.js');
const client = new Discord.Client();

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
function verNivel (user) {
    var nivel = usuarios[user.id].nivel;
    var xp = usuarios[user.id].xp;
    var sigNivel = nivel * 100;
    var agregarXp = 10;
    if (xp>= sigNivel) {
        usuarios[user.id].xp = 0;
        usuarios[user.id].nivel = nivel + 1;
        fs.writeFile("./users_levels.json", JSON.stringify(usuarios), (err) => {
            if(err) console.log(err);
        });
        //Embed inicio
        this.embed = new Discord.MessageEmbed()
        .setColor('#2336A2')
        .setTitle('NIVELES | MISION TIC 2022')
        .setAuthor('MinTic 2022', 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
        .setDescription(`El usuario <@${user.id}>  ha ascendido al nivel ${nivel + 1}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png")
        .setTimestamp()
        .setFooter('©MinTic | 2020 | Esteban - Juanjo', 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
        


    } else  {
        usuarios[user.id].xp = xp + agregarXp;
        this.embed = new Discord.MessageEmbed()
        fs.writeFile("./users_levels.json", JSON.stringify(usuarios), (err) => {
            if(err) console.log(err);
        });
    }
    
}

function consultarXp(message) {
    this.user = message.author;
    this.nivel = usuarios[this.user.id].nivel;
    this.xp = usuarios[this.user.id].xp;
    this.sigNivel = this.nivel * 100;

    this.embed = new Discord.MessageEmbed()
    .setColor('#EB5B77')
    .setTitle('NIVELES | MISION TIC 2022')
    .setAuthor('MinTic 2022', 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
    .addFields(
        {name: `** Aca podras consultar tu nivel. **`, value: `${this.user} | TU NIVEL ES:` },
        {name: 'Nivel: ', value: `${this.nivel}` },
        {name: 'XP: ', value: `${this.xp}/${this.sigNivel}`}
    )
    .setThumbnail('https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png')
    .setTimestamp()
    .setFooter('©MinTic | 2020 | Esteban - Juanjo', 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
    //|||||||||||||||EMBED

}

module.exports.usuarioRegistrado = usuarioRegistrado;
module.exports.registrarUsuario = registrarUsuario;
module.exports.verNivel = verNivel;
module.exports.consultarXp = consultarXp;