const urls = require("../models/urlModel");
const generateShortCode = require("../utils/generateCode");

function shortenUrl(req, res) {
  const { url, customCode, validForMinutes } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = customCode || generateShortCode();

  // Check if the short code already exists
  if (urls.find(entry => entry.shortCode === shortCode)) {
    return res.status(400).json({ error: "Short code already in use" });
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + (validForMinutes || 30) * 60000);

  const newEntry = {
    originalUrl: url,
    shortCode,
    createdAt: now,
    expiresAt,
    clicks: 0,
    logs: []
  };

  urls.push(newEntry);

  res.status(201).json({
    shortUrl: `http://localhost:3000/${shortCode}`,
    expiresAt
  });
}

module.exports = shortenUrl;
