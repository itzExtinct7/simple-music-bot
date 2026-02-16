const { ShoukakuPlayer } = require("shoukaku");

module.exports = {
  getPlayer: async (interaction, shoukaku) => {
    const node = shoukaku.getNode();

    // ✅ Dynamically join the user's voice channel
    const player = await node.joinChannel({
      guildId: interaction.guildId,
      channelId: interaction.member.voice.channel.id,
      shardId: interaction.guild.shardId,
      deaf: true
    });

    return player;
  }
};
