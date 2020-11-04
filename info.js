const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
//Consola
client.once('ready', () => {
	console.log('Mensajes Automaticos');
});

//HELP
client.on('message', (msg) => {
	if (msg.content == `${prefix}help`) {
		const embed = new Discord.MessageEmbed()
			.setColor('#00FFB6')
			.setTitle('AYUDA | MISION TIC 2022')
			.setURL('https://github.com/JuanJoZP/bot_discord_misiontic')
			.setAuthor(
				'MinTic 2022',
				'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png'
			)
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png'
			)
			.addField(
				{ name: 'PREFIX ❗️❗️', value: '`!!`' },
				{ name: '💢INFO RUTA 1', value: '`ruta1`' },
				{ name: '♨️INFO RUTA 2', value: '`PROXIMAMENTE`' },
				{ name: '💯VER NIVEL', value: '`nivel`' }
			)
			.setTimestamp()
			.setFooter(
				'©MinTic | 2020 | Esteban - Juanjo',
				'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png'
			);
		msg.delete();
		msg.channel.send(embed);
	}
});

//INFO RUTA 1
client.on('message', (msg) => {
	if (msg.content == `${prefix}ruta1`) {
		const embed = new Discord.MessageEmbed()
			.setColor('#FFA200')
			.setTitle('INFORMACION | MISION TIC 2022')
			.setURL('https://github.com/JuanJoZP/bot_discord_misiontic')
			.setAuthor(
				'MinTic 2022',
				'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png'
			)
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/755973908456538146/766351219886522388/articles-150235_logo.png'
			)
			.addField(
				{
					name: 'El link de la plataforma de CPE',
					value:
						'https://cpe.ciadti.co/ | Se puede descargar la aplicación Moodle para iniciar sesión desde el teléfono.',
				},
				{
					name: 'Canal de Youtube',
					value:
						'https://www.youtube.com/channel/UC46LKHvCp3teYn6OrykTLCg',
				},
				{
					name: 'Discord - Industrias Creativas',
					value: 'https://discord.gg/86rUf3cBbN',
				}
			)
			.setTimestamp()
			.setFooter(
				'©MinTic | 2020 | Esteban - Juanjo',
				'https://cdn.discordapp.com/attachments/755973908456538146/766365052541468672/misiontic.png'
			);
		msg.channel.send(embed);
		msg.delete();
	}
});

//token
client.login(config.token);
