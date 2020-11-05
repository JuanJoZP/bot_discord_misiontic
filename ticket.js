const Discord = require('discord.js');
const mod = '750465954361770045';
const client = new Discord.Client();
const token = process.env['TOKEN'];

var msg_id;
var canal_id = '773031137986478080';

client.once('ready', () => {
	console.log(`Ticket`);
	var ticket_canal = client.channels.cache.get(canal_id);
	ticket_canal.bulkDelete(20);
	abrirTicket(ticket_canal);
	limpiarTicket();
});

function abrirTicket(ticket_canal) {
	const embed = new Discord.MessageEmbed()
		.setColor('#02FD74')
		.setTitle('SOPORTE | ELEGIDOS RP')
		.setDescription('`Reacciona a este mensaje, para abrir un ticket.`')
		.setThumbnail(
			'https://cdn.discordapp.com/attachments/763211051793514556/763573080001085450/Discord-present.png'
		)
		.setFooter(
			'©ELEGIDOS RP | 2020',
			'https://cdn.discordapp.com/attachments/763211051793514556/763573080001085450/Discord-present.png'
		);

	ticket_canal.send(embed).then((msg) => {
		msg_id = msg.id;
		msg.react('📩');
	});
}

function enviarMensaje(canal, user) {
	const embed = new Discord.MessageEmbed()
		.setColor('#02FD74')
		.setTitle('TICKET | MISION TIC 2022')
		.setDescription(
			`<@${user.id}> tu ticket ha sido solicitado. Reacciona a "❌" para cerrar el Ticket.`
		)
		.setTimestamp();

	canal.send(embed).then((msg) => {
		msg.react('❌');
	});
}

function limpiarTicket() {
	var guild = client.guilds.cache.get('750464222047240264');
	guild.channels.cache.map((canal) => {
		if (canal.name.startsWith('ticket-')) {
			var id = canal.name.replace('ticket-', '');
			var user = client.users.cache.get(id);
			ticket_canal.bulkDelete(100).then(() => {
				enviarMensaje(canal, user);
			});
		}
	});
}

function crearTicket(message, user) {
	let canal = message.guild.channels.cache.find(
		(c) => c.name === `ticket-${user.username}`
	);
	if (!canal) {
		message.guild.channels
			.create(`ticket-${user.username}`, { reason: 'ticket' })
			.then((channel) => {
				enviarMensaje(channel, user);

				let rol = message.guild.roles.cache.find(
					(r) => r.name === '@everyone'
				);
				let rol2 = message.guild.roles.cache.get(mod);

				channel.createOverwrite(user, {
					SEND_MESSAGE: true,
					VIEW_CHANNEL: true,
					READ_MESSAGE_HISTORY: true,
				});
				channel.createOverwrite(rol2, {
					SEND_MESSAGE: true,
					VIEW_CHANNEL: true,
					READ_MESSAGE_HISTORY: true,
				});

				channel.createOverwrite(rol, {
					SEND_MESSAGE: false,
					VIEW_CHANNEL: false,
				});
			});
	}
}

client.on('message', async (message) => {
	if (message.content === 'close-ticket') {
		if (message.channel.name.startsWith('ticket-'))
			message.channel.delete();
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (user.bot) return;
	if (!msg_id) return;

	if (reaction.message.id == msg_id && reaction.emoji.name == '📩') {
		crearTicket(reaction.message, user);
		reaction.message.reactions.removeAll();
		reaction.message.react('📩');
	}
	if (
		reaction.message.channel.name.startsWith('ticket-') &&
		reaction.emoji.name == '❌'
	) {
		reaction.message.channel.delete();
	}
});

client.login(token);
