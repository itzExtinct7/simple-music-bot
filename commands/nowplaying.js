module.exports = {
  name: "nowplaying",
  description: "Show the currently playing track",
  execute: async (interaction, shoukaku) => {
    await interaction.deferReply();

    const player = shoukaku.players.get(interaction.guildId);
    if (!player || !player.track || !player.track.info) {
      return interaction.editReply("❌ No track is currently playing.");
    }

    const track = player.track;
    const title = track.info.title ?? "Unknown Title";
    const author = track.info.author ?? "Unknown Artist";
    const duration = track.info.length
      ? `${Math.floor(track.info.length / 60000)}:${String(Math.floor((track.info.length % 60000) / 1000)).padStart(2, "0")}`
      : "Unknown";

    interaction.editReply(`🎶 Now playing: **${title}** by **${author}** \`[${duration}]\``);
  }
};



