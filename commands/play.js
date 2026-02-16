
module.exports = {
  name: "play",
  description: "Play a song from a query or URL",
  options: [
    {
      name: "query",
      type: 3, // STRING
      description: "Song name or URL",
      required: true
    }
  ],
  execute: async (interaction, shoukaku) => {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "❌ This command only works in servers.",
        flags: 64
      });
    }

    await interaction.deferReply();

    try {
      const member = interaction.member ?? await interaction.guild.members.fetch(interaction.user.id);
      const voiceChannel = member.voice?.channel;

      if (!voiceChannel) {
        return interaction.editReply("❌ You must be in a voice channel.");
      }

      const query = interaction.options.getString("query");
      const node = [...shoukaku.nodes.values()][0];

      let player = shoukaku.players.get(interaction.guildId);
      if (!player) {
        player = await shoukaku.joinVoiceChannel({
          guildId: interaction.guildId,
          channelId: voiceChannel.id,
          shardId: interaction.guild.shardId,
          deaf: true
        });
      }

      if (!player.queue) player.queue = [];

      const result = await node.rest.resolve(query);
      let track;

      if (result.loadType === "track") {
        track = result.data;
      } else if (result.loadType === "search" && result.tracks.length > 0) {
        track = result.tracks[0];
      } else if (result.loadType === "playlist" && result.tracks.length > 0) {
        result.tracks.forEach(t => player.queue.push(t));
        track = result.tracks[0];
      } else {
        return interaction.editReply("❌ No results found.");
      }

      track.requestedBy = interaction.user.tag;
      player.queue.push(track);

      if (!player.track) {
        await player.update({ encodedTrack: track.encoded });
        player.track = track;
        return interaction.editReply(`🎶 Now playing: **${track.info.title}**`);
      } else {
        return interaction.editReply(`✅ Added to queue: **${track.info.title}**`);
      }
    } catch (err) {
      console.error("❌ Error in /play:", err);
      if (interaction.deferred) {
        await interaction.editReply("⚠️ Something went wrong.");
      } else {
        await interaction.reply({
          content: "⚠️ Something went wrong.",
          flags: 64
        });
      }
    }
  }
};





