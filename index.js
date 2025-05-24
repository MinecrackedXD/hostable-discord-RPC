const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});
require("dotenv").config();
const config = require("./config.js");
function validateConfig(config) {
  const requiredFields = [
    "showTime",
    "token",
    "timeZone",
    "Name",
    "State",
    "Details",
    "FirstButtonName",
    "FirstButtonUrl",
    "SecondButtonName",
    "SecondButtonUrl",
    "LargeImage",
    "LargeText",
    "SmallImage",
    "SmallText",
  ];

  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    console.error(`Config is not filled properly. Missing fields: ${missingFields.join(", ")}`);
    process.exit(1); // Exit the process with an error code
  }
}
let showTime = config.showTime;

client.on("ready", async () => {
  var AsciiTable = require("ascii-table");
  var table = new AsciiTable();
  table.setBorder("❘", "─", "✾", "❀");
  table.setTitle(`Logged In As ${client.user.username}!`);
  table
    .addRow(`Node.js`, `${process.version}`)
    .addRow(
      `Memory`,
      `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(
        process.memoryUsage().rss /
        1024 /
        1024
      ).toFixed(2)} MB`
    );

  setTimeout(() => {
    console.log(table.toString());
  }, 3000);
});

setInterval(() => {
  const newTime = showTime ? formatTime() : "";
  const timeZone = config.timeZone;
  const Spicy = newTime;

  const r = new Discord.RichPresence(client)
    .setApplicationId("1155449771562127453")
    .setType("WATCHING")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .setState(config.State)
    .setName(config.Name + Spicy)
    .setDetails(config.Details)
    .setAssetsLargeImage(config.LargeImage)
    .setAssetsLargeText(config.LargeText)
    .setAssetsSmallImage(config.SmallImage)
    .setAssetsSmallText(config.SmallText)
    .addButton(config.FirstButtonName, config.FirstButtonUrl)
    .addButton(config.SecondButtonName, config.SecondButtonUrl);

  client.user.setActivity(r);
}, 5000); // Update every 15 seconds

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Cient didn't logged in.. Killing the process..")
    process.kill(1);
  } else {
    console.log("Client has succesfully logged in!")
  }
}, 1 * 1000 * 20);
const keepAlive = require("./server.js");
keepAlive();
client.login(
  config.token
);