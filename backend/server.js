const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); 
require("dotenv").config();


const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"], 
    credentials: true, 
  })
);

app.use("/login", loginRoute);
app.use("/register", registerRoute);


app.listen(3000);
