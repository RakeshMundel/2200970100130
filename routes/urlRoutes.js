const express = require("express");
const router = express.Router();

const shortenUrl = require("../controllers/controllers/shortenController");
const handleRedirect = require("../controllers/controllers/redirectController");


const getAnalytics = require("../controllers/controllers/analyticsController");




// POST /shorten
router.post("/shorten", shortenUrl);
router.get("/shorturls/:shortCode", getAnalytics);

// GET /:shortCode
router.get("/:shortCode", handleRedirect);

module.exports = router;
