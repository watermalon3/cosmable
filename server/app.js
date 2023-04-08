require("dotenv").config();
const express = require("express");
const cors = require(`cors`);
const mongoose = require("mongoose");
const app = express();
const https = require("https-localhost")()

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;
const MONGO_URL = process.env.MONGO_URL;

const authController = require("./controllers/auth");

const routesController = require("./controllers/routes");
app.use(cors());
app.use(express.json());
app.use("/user", authController);

app.use("/routes", routesController);
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to ${MONGO_URL}`))
  .catch((err) => console.log(err));

app.listen(PORT, HOST, () => {
  https.listen(443)
  console.log(`[server] running on ${HOST}:${PORT}`);
});

