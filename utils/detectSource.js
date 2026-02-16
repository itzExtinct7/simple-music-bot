module.exports = function detectSource(query) {
  if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/i.test(query)) return "youtube";
  if (/^(https?:\/\/)?(open\.)?spotify\.com/i.test(query)) return "spotify";
  if (/^(https?:\/\/)?(music\.)?apple\.com/i.test(query)) return "apple";
  return "search";
};
