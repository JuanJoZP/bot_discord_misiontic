"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(); // eslint-disable-line
const discord_1 = require("@typeit/discord");
async function start() {
    const client = new discord_1.Client({
        classes: [
            `${__dirname}/*Discord.ts`,
            `${__dirname}/*Discord.js`, // If you compile using "tsc" the file extension change to .js
        ],
        silent: false,
        variablesChar: ":",
    });
    await client.login(process.env.TOKEN);
}
start();
//# sourceMappingURL=index.js.map