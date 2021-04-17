import fetch from "node-fetch";
import { changeStatus } from "./changeStatus.js";
let isFirst = true;
export default async () => {
  const req = await fetch(
    `https://api.uptimerobot.com/v2/getMonitors?api_key=${process.env.UPTIMEROBOT_KEY}`,
    {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );
  const res = await req.json();
  if (res.stat === "ok") {
    changeStatus(res.monitors, isFirst);
    isFirst = false;
  }
};
