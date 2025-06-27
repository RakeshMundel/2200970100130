const urls = require("../models/urlModel");

function handleRedirect(req, res) {
  const { shortCode } = req.params;

  const entry = urls.find(u => u.shortCode === shortCode);

  if (!entry) {
    return res.status(404).send("Short URL not found.");
  }

  const now = new Date();
  if (entry.expiresAt < now) {
    return res.status(410).send("Short URL has expired.");
  }

  entry.clicks += 1;
  entry.logs.push({
    timestamp: now,
    referrer: req.get("Referer") || "Direct",
    userAgent: req.get("User-Agent")
  });

  res.redirect(entry.originalUrl);
}

module.exports = handleRedirect;
