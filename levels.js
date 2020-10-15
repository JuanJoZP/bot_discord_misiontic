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
    var nivel = usuarios[user.id].nivel;
    var xp = usuarios[user.id].xp;
    var sigNivel = nivel * 100;
    var agregarXp = 10;
    if (xp>= sigNivel) {
        usuarios[user.id].xp = 0;
        usuarios[user.id].nivel = nivel + 1;
        //Embed inicio
        const embed = new Discord.MessageEmbed()
        .setColor('#2336A2')
        .setTitle('NIVELES | MISION TIC 2022')
        .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
        .setDescription(`El usuario <@${user.id}>  ha ascendido al nivel ${nivel + 1}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png")
        .setTimestamp()
        .setFooter('©MinTic | 2020 | Esteban - Juanjo', 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')

        //Embed final
        client.channels.cache.get(channel_levels_id).send(embed);

    } else  {
        usuarios[user.id].xp = xp + agregarXp;
    }
    
}

//PEDIR NIVEL
client.on("message", async message => {
    if(message.author.bot) return;

    if(usuarioRegistrado(message.author)) verNivel(message.author, message);
    else registrarUsuario(message.author);

    if(message.content == `${prefix}nivel`){
        var user = message.author;
        var nivel = usuarios[user.id].nivel;
        var xp = usuarios[user.id].xp;
        var sigNivel = nivel * 100;

        //|||||||||||||||EMBED
        const embed = new Discord.MessageEmbed()
	    .setColor('#EB5B77')
	    .setTitle('NIVELES | MISION TIC 2022')
	    .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
        .addFields(
            {name: `** Aca podras consultar tu nivel. **`, value: `${user} | TU NIVEL ES:` },
            {name: 'Nivel: ', value: `${nivel}` },
            {name: 'XP: ', value: `${xp}/${sigNivel}`}
        )
	    .setThumbnail('https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png')
	    .setTimestamp()
        .setFooter('©MinTic | 2020 | Esteban - Juanjo', 'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png')
        //|||||||||||||||EMBED

        message.channel.send(embed);
    }
});



//token
client.login(config.token);