const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;
app.use(bodyParser.json());
app.use(cors());

let records = [
  {
    id: 1,
    title: "First Post",
    content: "This is the first blog post.",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Second Post",
    content: "Another blog post here.",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Third Post",
    content: "Yet another post!",
    author: "Alice Johnson",
  },
];

// Get all records
app.get("/posts", (req, res) => {
  res.json(records);
});

// Get a specific record by ID
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const record = records.find((r) => r.id === id);

  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }

  res.json(record);
});

// Create a new record
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  const id = records.length + 1;
  const newRecord = { id, title, content, author };
  records.push(newRecord);
  res.status(201).json(newRecord);
});

// Update an existing record
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
  const index = records.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Record not found" });
  }

  const updatedRecord = { id, title, content, author };
  records[index] = updatedRecord;
  res.json(updatedRecord);
});

// Delete a record
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = records.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Record not found" });
  }

  records.splice(index, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
