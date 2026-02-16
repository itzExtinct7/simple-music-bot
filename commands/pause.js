module.exports = {
  name: "pause",
  description: "Pause the current track",
  execute: async (interaction, shoukaku) => {
    await interaction.deferReply();
    const player = shoukaku.players.get(interaction.guildId);
    if (!player || !player.track) return interaction.editReply("❌ No track is playing.");
    await player.setPaused(true);
    interaction.editReply("⏸️ Paused.");
  }
};
