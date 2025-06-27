const urls = require("../models/urlModel");

function getAnalytics(req, res) {
  const { shortCode } = req.params;

  const entry = urls.find(u => u.shortCode === shortCode);

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.status(200).json({
    originalUrl: entry.originalUrl,
    createdAt: entry.createdAt,
    expiresAt: entry.expiresAt,
    totalClicks: entry.clicks,
    logs: entry.logs
  });
}

module.exports = getAnalytics;
