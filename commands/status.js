const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "status",
  description: "Show Lavalink node status and health",
  execute: async (interaction, shoukaku) => {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle("📡 Lavalink Node Status")
      .setColor("Blurple");

    for (const node of shoukaku.nodes.values()) {
      const stats = node.stats;
      const connected = node.connected ? "🟢 Connected" : "🔴 Disconnected";
      const ping = node.ping ?? "N/A";
      const cpu = stats?.cpu?.systemLoad ?? "N/A";
      const memUsed = stats?.memory?.used ?? 0;
      const memTotal = stats?.memory?.reservable ?? 0;

      embed.addFields({
        name: `🌐 ${node.name}`,
        value: `${connected}\nPing: \`${ping}ms\`\nCPU Load: \`${(cpu * 100).toFixed(2)}%\`\nMemory: \`${(memUsed / 1024 / 1024).toFixed(1)}MB / ${(memTotal / 1024 / 1024).toFixed(1)}MB\``,
        inline: false
      });
    }

    interaction.editReply({ embeds: [embed] });
  }
};
