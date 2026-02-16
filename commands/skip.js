module.exports = {
  name: "skip",
  description: "Skip the current track",
  execute: async (interaction, shoukaku) => {
    await interaction.deferReply();
    const player = shoukaku.players.get(interaction.guildId);
    if (!player || !player.track) return interaction.editReply("❌ No track is playing.");
    const next = player.queue.shift();
    if (!next) {
      await player.stopTrack();
      return interaction.editReply("⏭️ Skipped. No more tracks in queue.");
    }
    await player.update({ encodedTrack: next.encoded });
    player.track = next;
    interaction.editReply(`⏭️ Skipped. Now playing: **${next.info.title}**`);
  }
};



