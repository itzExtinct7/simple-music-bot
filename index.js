const { Client, GatewayIntentBits, REST, Routes, Collection } = require("discord.js");
const { Shoukaku, Connectors } = require("shoukaku");
const config = require("./config");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const commands = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  commands.push({
    name: command.name,
    description: command.description,
    options: command.options || []
  });
}

const rest = new REST({ version: "10" }).setToken(config.token);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(config.clientId), { body: commands });
    console.log("✅ Slash commands registered");
  } catch (err) {
    console.error("❌ Command registration failed:", err);
  }
})();

const shoukaku = new Shoukaku(new Connectors.DiscordJS(client), config.nodes);

shoukaku.on("ready", name => console.log(`✅ Lavalink node ${name} is ready`));
shoukaku.on("error", (name, error) => console.error(`❌ Node ${name} error:`, error));
shoukaku.on("close", (name, code, reason) => console.warn(`⚠️ Node ${name} closed: ${code} - ${reason}`));

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, shoukaku);
  } catch (err) {
    console.error("❌ Command error:", err);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: "⚠️ Something went wrong.", flags: 64 });
    }
  }
});

client.once("clientReady", () => {
  console.log(`🎧 Logged in as ${client.user.tag}`);
});

client.login(config.token);




      






