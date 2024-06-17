const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post("/add", (req, res) => {  console.log('add',req.body)

  const { userId, leagueId, leagueName, sport } = req.body;

  const sql =
    "INSERT INTO fav_leagues (`userId`, `leagueId`, `leagueName`, `sport`) VALUES (?, ?, ?, ?)";

  pool.query(sql, [userId, leagueId, leagueName, sport], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/remove", (req, res) => {
  console.log('remove',req.body)
  const { userId, leagueId, leagueName, sport } = req.body;

  const sql = `DELETE FROM fav_leagues WHERE userId = "${userId}" AND sport = "${sport}" AND leagueId = "${leagueId}"`;

  pool.query(sql, [userId, leagueId, leagueName, sport], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});


router.post("/retrieve", (req, res) => {
  const { userId, sport } = req.body;
  console.log(req.body)
  const sql = `SELECT leagueId, leagueName FROM fav_leagues WHERE userId = "${userId}" AND sport = "${sport}"`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
