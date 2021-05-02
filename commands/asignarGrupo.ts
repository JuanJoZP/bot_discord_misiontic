import { CommandMessage, Command } from "@typeit/discord"
import { Message, Role } from "discord.js"

export abstract class asignarGrupo {
  @Command("asignarGrupo")
  async asignarGrupo(message: CommandMessage) {
    if (message.member?.roles.cache.some(role => role.name.startsWith("Grupo "))) {
      return message.reply("Ya tiene asignado un grupo")
    }
    const filter = (messageCollected: Message) => {
      const number = +messageCollected.content > 0 && +messageCollected.content < 81
      const isUser = message.author == messageCollected.author
      return number && isUser
    }

    await message.reply("Por favor ingrese el numero al que corresponde su grupo")

    const collector = await message.channel.createMessageCollector(filter, {
      maxProcessed: 1,
      time: 90000,
    })

    collector.on("dispose", (messageDisposed: Message) => {
      messageDisposed.reply("Numero invalido, por favor ingrese un numero de grupo nuevamente")
    })

    collector.on("end", async (collection, reason) => {
      const messageCollected = collection.first()

      if (!messageCollected) {
        return message.reply("Se acabo el tiempo, por favor ejecuta nuevamente el comando")
      }

      const user = messageCollected?.member
      const uni = { name: "Universidad Autónoma de Bucaramanga", color: "blue" } //user?.roles.cache.find(role => role.name.startsWith("Universidad"))

      if (!uni) {
        return messageCollected?.reply("Primero escoge tu universidad en <#755949620944830604>")
      }

      const groupNumber = messageCollected.content

      const uniChannel = user?.guild.channels.cache.find(
        channel =>
          channel.parentID == categorys[uni.name] &&
          channel.name == "Grupo " + getRange(+groupNumber)
      )

      if (!uniChannel) {
        const role = await user?.guild.roles.create({
          data: {
            name: "Grupo " + getRange(+groupNumber) + " " + uni.name,
            color: uni.color,
            mentionable: false,
          },
        })

        await user?.roles.add(role as Role)

        const parent = await user?.guild.channels.cache.get(categorys[uni.name])
        console.log(parent)
        console.log(categorys[uni.name])

        await user?.guild.channels.create("Grupo " + getRange(+groupNumber), {
          parent: parent,
          permissionOverwrites: [
            {
              id: (user.guild.roles.cache.find(role => role.name == "@everyone") as Role).id,
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: (role as Role).id,
              allow: [
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "ADD_REACTIONS",
                "READ_MESSAGE_HISTORY",
                "CONNECT",
              ],
            },
          ],
        })
      } else {
        const role = user?.guild.roles.cache.find(
          role => role.name == "Grupo " + getRange(+groupNumber) + " " + uni.name
        )
        await user?.roles.add(role as Role)
      }
    })
  }
}

const categorys = {
  "Universidad Autónoma de Bucaramanga": "838205542618497044", // 756320798339498010,
  "Universidad de Antioquia": "824347180478234664",
  "Universidad de Caldas": "824347579164786709",
  "Universidad del Norte": "755945465215844384",
  "Universidad El Bosque": "824347873323909140",
  "Universidad Industrial de Santander": "824348396919324704",
  "Universidad Nacional de Colombia": "755940808942944257",
  "Universidad Pontificia Bolivariana": "824348719813492787",
  "Universidad Sergio Arboleda": "824349230444707902",
  "Universidad Tecnológica de Pereira": "755943419766898801",
}

const getRange = (number: number): string => {
  const x = Math.ceil(number / 5)
  return "" + (x * 5 - 4) + "-" + x * 5
}
