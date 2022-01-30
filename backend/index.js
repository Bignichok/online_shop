require("dotenv").config();

const express = require("express");

const sequelize = require("./db");

const PORT = process.env.PORT || 8080;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log(e);
    }
};

start();
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
