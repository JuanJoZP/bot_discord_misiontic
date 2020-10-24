const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const levels = require('./levels.js')

const role_id = "750551197328605294";  //ROL ENTUSIASTA

//Consola
client.once("ready", () => {
    console.log(`Sesion iniciada como: ${client.tag}`)
});



//-------------------AUTOROL----------------------
client.on("guildMemberAdd", async member => {
    const autoRole = member.guild.roles.cache.get(role_id);
    
    if (!autoRole) return;
    //ASIGNA AUTOMATICAMENTE EL ROL DE ENTUSIASTA
    member.role.add(autoRole.id)
});



//-------------------NIVELES---------------
client.on("message", async message => {
    if(message.author.bot) return;

    if(levels.usuarioRegistrado(message.author)) {
        const verNivel = new levels.verNivel(message.author);

        if (verNivel.embed.author != null) {
            message.channel.send(verNivel.embed)
        }

    } else levels.registrarUsuario(message.author);

    if(message.content == `${prefix}nivel`){
        const consulta = new levels.consultarXp(message);
        if (consulta.embed) {
            message.channel.send(consulta.embed);
        }
    }
});


//---------------------WARNS-----------------


//token
client.login(config.token);
