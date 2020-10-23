const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

const role_id = "750551197328605294";  //ROL ENTUSIASTA

//Consola
client.once("ready", async msg =>{
    console.log(`Sesion iniciada como: ${user.tag}`)
});

client.on("guildMemberAdd", async member => {
    const autoRole = member.guild.roles.cache.get(role_id);
    
    if (!autoRole) return;
    //ASIGNA AUTOMATICAMENTE EL ROL DE ENTUSIASTA
    member.role.add(autoRole.id)
});

//token
client.login(config.token);
