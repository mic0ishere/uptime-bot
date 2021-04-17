import { Client } from "discord.js";
import { config } from "dotenv";
import ready from "./functions/ready.js";
config();
global.savedMonitors = [];
const bot = new Client();

ready(bot);

bot.login(process.env.DISCORD_TOKEN);

export { bot };
