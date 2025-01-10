const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db-connection");
const enqueryRouter = require("./App/routes/web/enquery_router");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/website/enquery", enqueryRouter);
connectDB();

app.get("/api/website/enquery", (req, res) => {
  res.send("Goodmorning");
})


app.listen(port, ()=> console.log(`Server running on ${port}`));

