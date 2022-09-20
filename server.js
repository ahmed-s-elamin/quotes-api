require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const quoteRouter = require("./routes/quotes");

//connecting to database
mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.on("open", () => console.log("connected to database"));

const app = express();

app.use(express.json());
app.use("/quotes", quoteRouter);

app.listen(3030, () => console.log("server running"));
