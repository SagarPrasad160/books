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

app.get("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`name`,`desc`,`cover`) VALUES(?)";
  const values = [req.body.name, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    res.json("Book has been added successfully");
  });
});

app.delete("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const q = "DELETE FROM books WHERE id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    res.json(`Book has been deleted successfully`);
  });
});

app.put("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const q = "UPDATE books SET `name` = ?,`desc` = ?,`cover` = ? WHERE id = ?";
  const values = [req.body.name, req.body.desc, req.body.cover];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    res.json("Book has been updated successfully");
  });
});

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
