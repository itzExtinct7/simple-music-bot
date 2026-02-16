module.exports = function formatQuery(query, source) {
  switch (source) {
    case "youtube": return query;
    case "spotify": return `spsearch:${query}`;
    case "apple": return `amsearch:${query}`;
    case "search": default: return `ytsearch:${query}`;
  }
};
