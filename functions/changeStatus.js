import { bot } from "../index.js";
import { notify } from "./notify.js";
import statusCheck from "./statusCheck.js";
let channel, statusMsg;
const changeStatus = async (monitors, isFirst) => {
  if (!channel) return;
  if (!isFirst) {
    let editedDesc = "";
    monitors.reverse().forEach((monitor) => {
      editedDesc += `${
        process.env.SHOW_EMOJI_STATUS.toLowerCase() === "true"
          ? `${changeStatusToEmoji(monitor.status)} - `
          : ""
      }**${monitor.friendly_name}**${
        process.env.SHOW_TEXT_STATUS.toLowerCase() === "true"
          ? ` - ${changeStatusToText(monitor.status)}`
          : ""
      }\n`;

      const savedMonitor = savedMonitors.find((x) => x.id === monitor.id);
      if (savedMonitor && savedMonitor.status !== monitor.status)
        notify(monitor);
    });
    savedMonitors = monitors;
    statusMsg.edit({
      embed: {
        description: editedDesc,
        color: 1281469,
        author: {
          name: "Service Status",
        },
        footer: {
          text: "Powered by Diffuse Network",
        },
      },
    });
  }
};
const changeStatusToEmoji = (status) => {
  if (status === 0) return ":white_circle:";
  if (status === 1) return ":black_circle:";
  if (status === 2) return ":green_circle:";
  if (status === 8) return ":orange_circle:";
  if (status === 9) return ":red_circle:";
};
const changeStatusToText = (status) => {
  if (status === 0) return "Not monitored";
  if (status === 1) return "Not checked yet";
  if (status === 2) return "Up";
  if (status === 8) return "Seems down";
  if (status === 9) return "Down";
};
const configureStatus = async () => {
  if (process.env.STATUS_CHANNEL) {
    channel = await bot.channels.fetch(process.env.STATUS_CHANNEL);

    // I stole code from https://github.com/iColtz/discord-fetch-all/blob/main/src/functions/fetchMessages.ts because I'm too dumb to do this myself
    let messages = [];
    let lastID;
    while (true) {
      const fetchedMessages = await channel.messages.fetch({
        limit: 100,
        ...(lastID && { before: lastID }),
      });

      if (fetchedMessages.size === 0) {
        messages = messages.filter(
          (msg) =>
            msg.author.id === bot.user.id &&
            msg.embeds.find((x) => x.color === 1281469)
        );
        messages.forEach((m) => m.delete());
        statusMsg = await channel.send({
          embed: {
            description: "Loading status of services...",
            color: 1281469,
            author: {
              name: "Service Status",
            },
            footer: {
              text: "Powered by Diffuse Network",
            },
          },
        });
        return await statusCheck();
      }
      messages = messages.concat(Array.from(fetchedMessages.values()));
      lastID = fetchedMessages.lastKey();
    }
  }
};
export { configureStatus, changeStatus };
