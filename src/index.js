import express from "express";
import storage from "./memory_storage.js";
import cors from "cors";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({});
});

app.get("/beehives", (req, res) => {
  // used to get beehive data
  let a = 0;
  storage.length = storage.length();
  while (a < storage.length) {
    let beehiveCount = storage.users.beehiveCount;
    console.log(beehiveCount);
  }
  let doc = req.body;

  res.json(beehiveCount);
});

app.get("/users", (req, res) => {
  // used to get user details
  let userlist = storage.users;
  console.log("length", storage.users.length);

  for (let i = 0; i < storage.users.length; i++) {
    let username = storage.users[i].fullname;
    let beehiveCount = userlist[i].beehiveCount;
    console.log(username, "has", beehiveCount, "beehives");
  }
  console.log("Ok!");
  let doc = req.body;

  res.json(userlist);
});

app.post("/users", (req, res) => {
  // used to set user details
});

app.post("/beehives", (req, res) => {
  // used to set beehive details
});

app.listen(port, () => console.log(`Backend port -> ${port}!`));
