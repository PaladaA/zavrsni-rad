const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post("/add", (req, res) => {
  console.log("add", req.body);

  const { userId, matchId, sport } = req.body;

  const sql =
    "INSERT INTO fav_matches (`userId`, `matchId`, `sport`) VALUES (?, ?, ?)";

  pool.query(sql, [userId, matchId, sport], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/remove", (req, res) => {
  console.log("remove", req.body);
  const { userId, matchId, sport } = req.body;

  const sql = `DELETE FROM fav_matches WHERE userId = "${userId}" AND sport = "${sport}" AND matchId = "${matchId}"`;

  pool.query(sql, [userId, matchId, sport], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/retrieve", (req, res) => {
  const { userId, sport } = req.body;
  console.log(req.body);
  const sql = `SELECT matchId FROM fav_matches WHERE userId = "${userId}" AND sport = "${sport}"`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("99", data);
      res.send(data);
    }
  });
});

module.exports = router;
