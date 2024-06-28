const express = require("express");
const router = express.Router();
const pool = require("../database");
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.patch("/changeName", (req, res) => {//za promjenu imena
  const { name, id } = req.body;

  const sql = `UPDATE users SET name = "${name}" WHERE id = "${id}"`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/login", (req, res) => {//nakon promjene imena potrbno je promjenit token pa je koristena ova funkcija koja nalazi usera i pridjeljuje token daljnim procesom
  const { id, name, email } = req.body;
  const sql = `SELECT name, email, id FROM users WHERE id = "${id}";`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const token = jwt.sign({ id, name, email }, privateKey, {
        expiresIn: "24h",
      });
      res.send({ token: token });
    }
  });
});

router.delete("/delete", (req, res) => {//brisemo usera
  const { id, name, email } = req.body;
  const sql = `DELETE FROM users WHERE id = "${id}" AND email = "${email}";`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "account is successfully deleted!" });
    }
  });
});

router.post("/users", (req, res) => {//lista svih usera
  const { input } = req.body;
  let sql;
  if (input.trim() === '') {
    sql = 'SELECT name, email, id FROM users;';
  } else {
    sql = `SELECT name, email, id FROM users WHERE name LIKE "%${input}%";`;
  }

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/addLeagueInHistory", (req, res) => {//lista svih usera
  const { userId, leagueId, leagueName, sport } = req.body;

  let datetime = new Date(); // Current date and time
  datetime.setHours(datetime.getHours() + 2); // Add 2 hours

  // Format the date to YYYY-MM-DD HH:mm:ss
  let visitedDate = datetime.toISOString().replace('T', ' ').substring(0, 19);

  console.log("visitedDate:", visitedDate);

  let sql = "INSERT INTO leagues_history (`userId`, `leagueId`, `leagueName`, `sport`, `visitedDate`) VALUES (?, ?, ?, ?, ?)";

  pool.query(sql, [userId, leagueId, leagueName, sport, visitedDate], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/getLeagueFromHistory", (req, res) => {//lista svih usera
  const { userId, sport } = req.body;
  let sql;

  if (sport)
    sql = `SELECT leagueName, sport, leagueId, visitedDate FROM leagues_history WHERE userId = "${userId}" AND sport = "${sport}" ORDER BY visitedDate DESC`;
  else
    sql = `SELECT leagueName, sport, leagueId, visitedDate FROM leagues_history WHERE userId = "${userId}" ORDER BY visitedDate DESC`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});


router.delete("/removeFromSearchHistory", (req, res) => {//lista svih usera
  const { userId, sport, leagueName } = req.body;
  const sql = 'DELETE FROM leagues_history WHERE userId = ? AND sport = ? AND leagueName = ?';
  const values = [userId, sport, leagueName];

  pool.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});


router.patch("/changePassword", (req, res) => {
  const { userId, password, } = req.body;

  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  const params = [password, userId];

  bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log(hash);
    const passwordHashed = hash;

    pool.query(sql, [passwordHashed, userId], (err, data) => {
      if (err) {
        if (err.errno == 1062) {
          return res.send({
            message: "idk",
          });
        } else {
          console.log(err);
        }
      } else {
        res.send({ message: "successfully changed password" });
      }
    });
  });
});

router.post("/addStringToSearchHistory", (req, res) => {
  const { userId, searchTerm } = req.body;

  let datetime = new Date(); // Current date and time
  datetime.setHours(datetime.getHours() + 2); // Add 2 hours
  let visitedDate = datetime.toISOString().replace('T', ' ').substring(0, 19); // Format the date to YYYY-MM-DD HH:mm:ss

  if (userId !== '' && userId !== 'undefined' && userId != null) {
    let sql = "INSERT INTO search_history (`userId`, `searchTerm`, `visitedDate`) VALUES (?, ?, ?)";

    pool.query(sql, [userId, searchTerm, visitedDate], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  }
});

router.get("/getSearchHistory", (req, res) => {
  const { userId } = req.query;
  let sql;
  console.log(req.url)
  console.log("getSearchHistory", userId)

  if (userId !== '' && userId !== 'undefined') {
    sql = `SELECT userId, searchTerm, visitedDate FROM search_history WHERE userId = "${userId}" ORDER BY visitedDate DESC`;
    console.log(sql)

    pool.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data)
        res.send(data);
      }
    });
  }
});

module.exports = router;
