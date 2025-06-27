const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const bodyParser = require("body-parser");
const cors = require("cors");
const urlRoutes = require("../routes/urlRoutes");
const logger = require("./middlewares/logger");




const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);

// Middleware
app.use(cors());
app.use(bodyParser.json());





// test route
app.get("/", (req, res) => {
  res.send("URL Shortener Microservice is running.");
});

// Routes
app.use("/", urlRoutes);

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
