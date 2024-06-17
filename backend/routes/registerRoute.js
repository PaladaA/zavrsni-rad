const express = require("express");
const router = express.Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res) => {
  console.log(req.body);
  const { email, password, name, role = "user" } = req.body;
  const sql =
    "INSERT INTO users (`email`, `password`, `name`, `role`) VALUES (?, ?, ?, ?)";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log(hash);
    const passwordHashed = hash;

    pool.query(sql, [email, passwordHashed, name, role], (err, data) => {
      if (err) {
        if (err.errno == 1062) {
          return res.send({
            message: "E-mail already exists",
          });
        } else {
          console.log(err);
        }
      } else {
        res.send({ message: "successfully registered" });
      }
    });
  });
});

module.exports = router;
