import { configureNotifications } from "./notify.js";
import { configureStatus } from "./changeStatus.js";
import statusCheck from "./statusCheck.js";

export default async (bot) => {
  bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.username}`);
    configureNotifications();
    configureStatus();
    setInterval(async () => {
        await statusCheck();
    }, parseInt(process.env.INTERVAL));
  });
};
