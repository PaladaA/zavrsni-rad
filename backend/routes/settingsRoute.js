const express = require("express");
const router = express.Router();
const pool = require("../database");
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;

router.patch("/change", (req, res) => {//za promjenu imena
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


module.exports = router;
