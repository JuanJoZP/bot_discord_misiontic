require('dotenv').config();
const prefix = process.env['PREFIX'];
const token = process.env['TOKEN'];
const Discord = require('discord.js');
const client = new Discord.Client();
const levels = require('./levels.js');
const warn = require('./warn.js');
const info = require('./info.js');
const role_id = '750551197328605294'; //ROL ENTUSIASTA
const admin = '756000768317849692'; //CAMBIAR POR LA ID DE EL ROL DE ADMIN EN CADA SERVIDOR
const mod = '768270744299503686'; //SEGUNDO ROL DE ADMIN - CAMBIAR POR LA ID DE EL ROL DE ADMIN EN CADA SERVIDOR

//Consola
client.once('ready', () => {
	console.log(`Sesion iniciada como: ${client.tag}`);
});

//-------------------AUTOROL----------------------
client.on('guildMemberAdd', async (member) => {
	const autoRole = member.guild.roles.cache.get(role_id);

	if (!autoRole) return;
	//ASIGNA AUTOMATICAMENTE EL ROL DE ENTUSIASTA
	member.role.add(autoRole.id);
});

//-------------------NIVELES---------------
client.on('message', async (message) => {
	if (message.author.bot) return;

	if (levels.usuarioRegistrado(message.author)) {
		const verNivel = new levels.verNivel(message.author);

		if (verNivel.embed.author != null) {
			message.channel.send(verNivel.embed);
		}
	} else levels.registrarUsuario(message.author);

	if (message.content == `${prefix}nivel`) {
		const consulta = new levels.consultarXp(message);
		if (consulta.embed) {
			message.channel.send(consulta.embed);
		}
	}
});

//---------------------WARNS---------------------

//COMPRUEBA SI EL USUARIO ESTA REGISTRADO EN LA DB DE WARNS
client.on('message', (message) => {
	if (warn.usuariosWarneados(message.author)) return;
	else warn.registrarWarns(message.author);
});

//MENSAJE PARA WARNEAR
client.on('message', async (message) => {
	if (message.content.startsWith(`${prefix}warn`)) {
		//AQUI SE AGREGAN MAS ROLES DE ADMINISTRADORES)
		if (
			message.member.roles.cache.get(admin) ||
			message.member.roles.cache.get(mod)
		) {
			var user = message.mentions.users.first();
			var reason = message.content.split(' ')[2];
			var member = message.guild.member(user);

			message.delete();
			if (!member.hasPermission('ADMINISTRATOR')) {
				const warneo = new warn.warneado(user, member, reason);

				try {
					console.log(warneo.response);
					if (warneo.response) {
						message.channel.send(warneo.response);
					} else {
						throw 'ban';
					}
				} catch (err) {
					if (err == 'ban') {
						message.channel.send(
							`El usuario ${user} ha sido baneado`
						);
					}
					console.log(err);
				}
			} else {
				message.reply(`No puede warnear a ${user}.`);
			}
		} else {
			message.delete();
			message.reply('No tienes permisos para realizar esta acción');
		}
	}
});

//token
client.login(token);
