const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = 3000;
let books = [
  { id: 1, title: "computer science", author: "Shivam", year: 2024 },
];

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// for test only
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "server is online",
  });
});

// all books
app.get("/books", (req, res) => {
  res.json(books);
});

// book by id
app.get("/books:id", (req, res) => {
  const book = books.find((b) => b.id == req.params.id);

  if (book) {
    return res.status(200).json({
      success: true,
      res: book,
    });
  }

  return res.status(404).json({
    res: "No book found",
  });
});

// create book
app.post("/addbook", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ error: "Title, author, and year are required" });
  }
  const book = { id: books.length + 1, title, author, year };
  books.push(book);
  res.status(201).end();
});

// update
app.put("/updatebook/:id", (req, res) => {
  const { title, author, year } = req.body;
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  if (title) book.title = title;
  if (author) book.author = author;
  if (year) book.year = year;
  res.json(book);
});

// Delete (DELETE) a book by ID
app.delete("/deletebookbyid/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }
  books.splice(bookIndex, 1);
  res.status(204).json({
    success: true,
    message: "book deleted",
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
  console.log(`App is running at port ${port}`);
});
