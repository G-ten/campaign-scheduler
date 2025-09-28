const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
require("./config/database");

const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const { startScheduler } = require("./services/scheduler");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/campaign", campaignRoutes);

startScheduler();

app.listen(process.env.PORT, function () {
    console.log(`Linstening on port ${process.env.PORT}.`);
});