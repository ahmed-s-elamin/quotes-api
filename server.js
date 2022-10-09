require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const qrouter = require("./routes/quotes");

app.use(express.json());
app.use(cors());

//connecting to database
mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.on("open", () => console.log("connected to database"));

app.use("/", qrouter);

const port = process.env.PORT || 3030;
app.listen(port, () => console.log("server running"));
