module.exports = {
  token: "MTI5OTYyNDY0Mjk2NDc1NDQ2NA.GquHSG.uSGqtNe6GgeqQKGMjyvPK-QHETBy3TVP8BwsHY",
  clientId: "1299624642964754464",
  nodes: [
    {
      name: "MainNode",
      url: "lavalink.serenetia.com:80",      // Host and port only
      auth: "https://dsc.gg/ajidevserver",               // Lavalink password
      secure: false                          // true if using HTTPS/WSS
    },
    {
      name: "BackupNode",
      url: "lavalink.serenetia.com:80",   // Your Glacier Lavalink node
      auth: "https://dsc.gg/ajidevserver",               // Must match your Glacier Lavalink password
      secure: false
    }
  ]
};

