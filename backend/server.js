const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); //This middleware is responsible for parsing incoming request bodies with JSON payloads.
require("dotenv").config();


const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const favoriteLeaguesRoute = require("./routes/favoriteLeaguesRoute");
const favoriteMatchesRoute = require("./routes/favoriteMatchesRoute");
const settingsRoute = require("./routes/settingsRoute");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/favorite-leagues", favoriteLeaguesRoute);
app.use("/favorite-matches", favoriteMatchesRoute);
app.use("/settings", settingsRoute);


app.listen(3000);
