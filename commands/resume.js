module.exports = {
  name: "resume",
  description: "Resume the paused track",
  execute: async (interaction, shoukaku) => {
    await interaction.deferReply();
    const player = shoukaku.players.get(interaction.guildId);
    if (!player || !player.track) return interaction.editReply("❌ No track is playing.");
    await player.setPaused(false);
    interaction.editReply("▶️ Resumed.");
  }
};
