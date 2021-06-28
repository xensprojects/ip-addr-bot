import "dotenv/config";
import { Markup, Telegraf } from "telegraf";
import { getIPInfo } from "./services/ip-info";

const { BOT_TOKEN } = process.env;

function start() {
  const bot = new Telegraf(BOT_TOKEN);

  bot.start(async (ctx) => {
    ctx.reply(
      `Hi, ${ctx.from.first_name}! Send me an IP address to get the information about the IP address.\n\n`,
      Markup.inlineKeyboard([
        Markup.button.url(
          "Learn more about IP address",
          "https://blog.mozilla.org/en/internet-culture/what-is-an-ip-address/"
        ),
      ])
    );
  });

  bot.on("text", async (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, "typing");
    const ip = ctx.message.text;
    const info = await getIPInfo(ip);
    ctx.reply(info, {
      parse_mode: "Markdown",
    });
  });

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
