"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignarGrupo = void 0;
const tslib_1 = require("tslib");
const discord_1 = require("@typeit/discord");
class asignarGrupo {
    async asignarGrupo(message) {
        var _a;
        if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.some(role => role.name.startsWith("Grupo "))) {
            return message.reply("Ya tiene asignado un grupo");
        }
        const filter = (messageCollected) => {
            const number = +messageCollected.content > 0 && +messageCollected.content < 81;
            const isUser = message.author == messageCollected.author;
            return number && isUser;
        };
        await message.reply("Por favor ingrese el numero al que corresponde su grupo");
        const collector = await message.channel.createMessageCollector(filter, {
            maxProcessed: 1,
            time: 90000,
        });
        collector.on("dispose", (messageDisposed) => {
            messageDisposed.reply("Numero invalido, por favor ingrese un numero de grupo nuevamente");
        });
        collector.on("end", async (collection, reason) => {
            const messageCollected = collection.first();
            if (!messageCollected) {
                return message.reply("Se acabo el tiempo, por favor ejecuta nuevamente el comando");
            }
            const user = messageCollected === null || messageCollected === void 0 ? void 0 : messageCollected.member;
            const uni = { name: "Universidad Autónoma de Bucaramanga", color: "blue" }; //user?.roles.cache.find(role => role.name.startsWith("Universidad"))
            if (!uni) {
                return messageCollected === null || messageCollected === void 0 ? void 0 : messageCollected.reply("Primero escoge tu universidad en <#755949620944830604>");
            }
            const groupNumber = messageCollected.content;
            const uniChannel = user === null || user === void 0 ? void 0 : user.guild.channels.cache.find(channel => channel.parentID == categorys[uni.name] &&
                channel.name == "Grupo " + getRange(+groupNumber));
            if (!uniChannel) {
                const role = await (user === null || user === void 0 ? void 0 : user.guild.roles.create({
                    data: {
                        name: "Grupo " + getRange(+groupNumber) + " " + uni.name,
                        color: uni.color,
                        mentionable: false,
                    },
                }));
                await (user === null || user === void 0 ? void 0 : user.roles.add(role));
                const parent = await (user === null || user === void 0 ? void 0 : user.guild.channels.cache.get(categorys[uni.name]));
                console.log(parent);
                console.log(categorys[uni.name]);
                await (user === null || user === void 0 ? void 0 : user.guild.channels.create("Grupo " + getRange(+groupNumber), {
                    parent: parent,
                    permissionOverwrites: [
                        {
                            id: user.guild.roles.cache.find(role => role.name == "@everyone").id,
                            deny: ["VIEW_CHANNEL"],
                        },
                        {
                            id: role.id,
                            allow: [
                                "VIEW_CHANNEL",
                                "SEND_MESSAGES",
                                "ADD_REACTIONS",
                                "READ_MESSAGE_HISTORY",
                                "CONNECT",
                            ],
                        },
                    ],
                }));
            }
            else {
                const role = user === null || user === void 0 ? void 0 : user.guild.roles.cache.find(role => role.name == "Grupo " + getRange(+groupNumber) + " " + uni.name);
                await (user === null || user === void 0 ? void 0 : user.roles.add(role));
            }
        });
    }
}
tslib_1.__decorate([
    discord_1.Command("asignarGrupo"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_1.CommandMessage]),
    tslib_1.__metadata("design:returntype", Promise)
], asignarGrupo.prototype, "asignarGrupo", null);
exports.asignarGrupo = asignarGrupo;
const categorys = {
    "Universidad Autónoma de Bucaramanga": "838205542618497044",
    "Universidad de Antioquia": "824347180478234664",
    "Universidad de Caldas": "824347579164786709",
    "Universidad del Norte": "755945465215844384",
    "Universidad El Bosque": "824347873323909140",
    "Universidad Industrial de Santander": "824348396919324704",
    "Universidad Nacional de Colombia": "755940808942944257",
    "Universidad Pontificia Bolivariana": "824348719813492787",
    "Universidad Sergio Arboleda": "824349230444707902",
    "Universidad Tecnológica de Pereira": "755943419766898801",
};
const getRange = (number) => {
    const x = Math.ceil(number / 5);
    return "" + (x * 5 - 4) + "-" + x * 5;
};
//# sourceMappingURL=asignarGrupo.js.map