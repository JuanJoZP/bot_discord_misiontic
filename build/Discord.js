"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv").config();
const discord_1 = require("@typeit/discord");
const discord_js_1 = require("discord.js");
const path_1 = tslib_1.__importDefault(require("path"));
let AppDiscord = class AppDiscord {
    onReady([ready], client) {
        console.log("bot ready");
    }
    notFound(message) {
        message.reply("No hemos encontrado el comando");
    }
};
tslib_1.__decorate([
    discord_1.Once("ready"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, discord_js_1.Client]),
    tslib_1.__metadata("design:returntype", void 0)
], AppDiscord.prototype, "onReady", null);
tslib_1.__decorate([
    discord_1.CommandNotFound(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_1.CommandMessage]),
    tslib_1.__metadata("design:returntype", void 0)
], AppDiscord.prototype, "notFound", null);
AppDiscord = tslib_1.__decorate([
    discord_1.Discord(process.env.PREFIX, {
        import: [
            path_1.default.join(__dirname, "commands", "*.js"),
            path_1.default.join(__dirname, "events", "*.js"),
            // You can also specify the class directly here if you don't want to use a glob
        ],
    }) // Decorate the class
], AppDiscord);
//# sourceMappingURL=Discord.js.map