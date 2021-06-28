import "dotenv/config";
import { Telegraf } from "telegraf";

const { BOT_TOKEN } = process.env;

function start() {
  const bot = new Telegraf(BOT_TOKEN);

  bot.launch().then(() => {
    console.log("[INFO] Bot has been started");
  });
}

if (!BOT_TOKEN) {
  console.log(
    "[ERROR] Please move .sample.env to .env and fill in the values."
  );
} else {
  start();
}
