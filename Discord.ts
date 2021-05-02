require("dotenv").config()
import { CommandMessage, CommandNotFound, Discord, Once } from "@typeit/discord"
import { Client } from "discord.js"
import path from "path"

@Discord(process.env.PREFIX as string, {
  import: [
    path.join(__dirname, "commands", "*.js"),
    path.join(__dirname, "events", "*.js"),
    // You can also specify the class directly here if you don't want to use a glob
  ],
}) // Decorate the class
abstract class AppDiscord {
  @Once("ready")
  private onReady([ready], client: Client) {
    console.log("bot ready")
  }

  @CommandNotFound()
  private notFound(message: CommandMessage) {
    message.reply("No hemos encontrado el comando")
  }
}
