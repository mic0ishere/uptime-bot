import { bot } from "../index.js";
let channel;
const notify = async (monitor) => {
  if (!channel) return;
  if (monitor.status === 9) {
    channel.send({
      embed: {
        title: ":red_circle: Monitor Down",
        description: `**${monitor.friendly_name}** is **down**`,
        color: 13250608,
        footer: {
          text: "Powered by Diffuse Network",
        },
      },
    });
  } else if (monitor.status === 2) {
    channel.send({
      embed: {
        title: ":green_circle: Monitor Up",
        description: `**${monitor.friendly_name}** is **working properly**`,
        color: 2342466,
        footer: {
          text: "Powered by Diffuse Network",
        },
      },
    });
  }
};
const configureNotifications = async () => {
  if (process.env.NOTIFICATIONS_CHANNEL) {
    channel = await bot.channels.fetch(process.env.NOTIFICATIONS_CHANNEL);
  }
};

export { notify, configureNotifications };
