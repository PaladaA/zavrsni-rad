const express = require("express");
const router = express.Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY;

router.get("/", (req, res) => {
  const token = req.headers.authorization;

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      console.log("nista");
      res.send({ message: "Token isn't valid" });
    } else res.send(decoded);
  });
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = "${email}";`;

  pool.query(sql, (err, data) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (data.length > 0) {
        const hash = data[0].password;
        bcrypt.compare(password, hash, (error, response) => {
          if (response) {
            const { id, name } = data[0];
            const token = jwt.sign({ id, name, email }, privateKey, {
              expiresIn: "24h",
            });
            res.send({ token: token });
          } else {
            res.send({ message: "Wrong password" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  });
});

module.exports = router;
