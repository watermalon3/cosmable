require("dotenv").config();
const express = require("express");
const cors = require(`cors`);
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;

app.use(cors());

app.listen(PORT, HOST, () => {
  console.log(`[server] running on ${HOST}:${PORT}`);
});
