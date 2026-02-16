module.exports = {
  name: "queue",
  description: "Show the current music queue",
  execute: async (interaction, shoukaku) => {
    await interaction.deferReply();
    const player = shoukaku.players.get(interaction.guildId);
    if (!player || !player.queue || player.queue.length === 0) {
      return interaction.editReply("📭 Queue is empty.");
    }

    const queueList = player.queue
      .slice(0, 10)
      .map((track, i) => `${i + 1}. **${track.info.title}**`)
      .join("\n");

    interaction.editReply(`📜 Current Queue:\n${queueList}`);
  }
};

