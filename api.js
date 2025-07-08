const express = require("express");
const app = express();

// Middleware do parsowania JSON
app.use(express.json());

// Serwuj pliki statyczne (HTML, CSS, JS)
app.use(express.static("."));

// CORS - pozwól na połączenia z przeglądarki
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Przykładowe dane
let users = [
  { id: 1, name: "Jan", email: "jan@example.com" },
  { id: 2, name: "Anna", email: "anna@example.com" },
];

// GET - pobierz wszystkich użytkowników
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET - pobierz użytkownika po ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).json({ error: "Użytkownik nie znaleziony" });
  res.json(user);
});

// POST - dodaj nowego użytkownika
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - zaktualizuj użytkownika
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).json({ error: "Użytkownik nie znaleziony" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

// DELETE - usuń użytkownika
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ error: "Użytkownik nie znaleziony" });

  users.splice(index, 1);
  res.json({ message: "Użytkownik usunięty" });
});

app.listen(3000, () => {
  console.log("API działa na http://localhost:3000");
});
