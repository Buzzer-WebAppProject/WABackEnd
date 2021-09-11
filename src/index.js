import dotenv from "dotenv";
dotenv.config();

import express, { response } from "express";
import storage from "./memory_storage.js";
import cors from "cors";
import connect from "./db.js";
import auth from "./auth.js";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({});
});

app.get("/beehives", async (req, res) => {
  let db = await connect();
  let cursor = await db
    .collection("beehives")
    .find({ fullname: "David Kostic" });

  let data = await cursor.toArray();

  res.json(data);
});

app.get("/beehives_memory", (req, res) => {
  // used to get beehive data
  let bList = [];
  let bDataList = [];
  for (var i = 0; i < storage.users.length; i++) {
    let bCount = storage.users[i].beehiveCount;
    if (storage.users[i].fullname == "David Kostic") {
      for (let x = 0; x < storage.users[i].beehives.length; x++) {
        var bData = storage.users[i].beehives[x];
        bDataList.push(bData);
      }
      bList.push(bCount);
    }
  }
  let doc = req.body;

  res.json(bDataList);
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

app.get("/tajna", (req, res) => {
  res.json({ message: "Ovo je tajna " + req.jwt.mail });
});

app.post("/users", async (req, res) => {
  // used to set user details

  // registracija
  let user = req.body;

  let id;
  try {
    id = await auth.registerFn(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.json({ id: id });
});

app.post("/auth", async (req, res) => {
  let user = req.body;

  try {
    let result = await auth.loginFn(user.mail, user.password);
    res.json(result);
  } catch (e) {
    res.status(403).json({ error: e.message });
  }

  res.send(user);
});

app.post("/beehives", (req, res) => {
  // used to set beehive details
});

app.listen(port, () => console.log(`Backend port -> ${port}!`));
