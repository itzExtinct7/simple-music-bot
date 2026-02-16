module.exports = {
  name: "stop",
  description: "Stop playback and leave voice channel",
  execute: async (interaction, shoukaku) => {
    await interaction.deferReply();
    const player = shoukaku.players.get(interaction.guildId);
    if (!player) return interaction.editReply("❌ Bot is not in a voice channel.");
    await player.destroy();
    interaction.editReply("🛑 Playback stopped and disconnected.");
  }
};


