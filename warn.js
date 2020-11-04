const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
if (fs.existsSync('./warns.json')) {
	const usuarios = require('./warns.json');
} else {
	fs.writeFile('./warns.json', '{}', (err) => {
		if (err) {
			console.log(err);
		}
		const usuarios = require('./warns.json');
	});
}

//COMPRUEBA SI EL USUARIO ESTA REGISTRADO EN LA DB
function usuariosWarneados(user) {
	try {
		if (!usuarios[user.id]) return false;
		else return true;
	} catch (e) {
		return false;
	}
}

//REGISTRAR USUARIOS EN LA BASE DE DATOS
function registrarWarns(user) {
	try {
		usuarios[user.id] = {
			warns: 0,
		};

		console.log(`${user.tag} fué registrado`);

		fs.writeFile('./warns.json', JSON.stringify(usuarios), (err) => {
			if (err) console.log(err);
		});
	} catch (e) {
		return;
	}
}

//APLICA EL WARNEO A EL USUARIO EN CUESTION, ACTUALIZA LA BASE DE DATOS, Y ENVIA EL MENSAJE AVISANDO QUE EL USUARIO FUE WARNEADO
function warneado(user, member, reason) {
	var warn = usuarios[user.id].warns;
	var limit = 2; //CAMBIAR POR LA CANTIDAD DE WARNS A RECIBIR ANTES DE SER BANEADO - 1

	//cuando el usuario acumula (limit + 1) advertencias es baneado permanentemente
	if (warn == limit) {
		if (member) {
			member
				.ban({
					reason: reason,
				})
				.then(() => {
					console.log('EL usuario fue baneado');
				})
				.catch((err) => {
					console.log(err);
				});
			usuarios[user.id].warns = 0;
			fs.writeFile('./warns.json', JSON.stringify(usuarios), (err) => {
				if (err) console.log(err);
			});
		}
		//cuando lleva menos de (limit + 1) warneos, se muestra el mensaje de warneo y se actualiza la base de datos
		//CAMBIAR EMBED PARA QUE CONTENGA LOS DATOS RESPECTIVOS A CADA SERVIDOR
	} else {
		usuarios[user.id].warns = warn + 1;
		//|||||||||||||||EMBED
		const embed = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setTitle('WARNS | MisionTic2020')
			.setAuthor(
				'MinTic 2022',
				'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png'
			)
			.setDescription(
				`<@${user.id}> ** | Ha recibido un warn ${
					warn + 1
				} debido a ${reason}. **`
			)
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png'
			)
			.setTimestamp()
			.setFooter(
				'©MinTic | 2020 | Esteban - JuanJo',
				'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png'
			);
		//|||||||||||||||EMBED
		fs.writeFile('./warns.json', JSON.stringify(usuarios), (err) => {
			if (err) console.log(err);
		});

		this.response = embed;
	}
}

module.exports.usuariosWarneados = usuariosWarneados;
module.exports.registrarWarns = registrarWarns;
module.exports.warneado = warneado;
