const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sagar",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hi there");
});

app.get("/books", (req, res) => {
  const q = "SELECT * from books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`name`,`desc`,`cover`) VALUES(?)";
  const values = [req.body.name, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
