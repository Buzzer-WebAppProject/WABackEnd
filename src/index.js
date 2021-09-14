import dotenv from "dotenv";
dotenv.config();

import express, { response } from "express";
import storage from "./memory_storage.js";
import cors from "cors";
import connect from "./db.js";
import auth from "./auth.js";
import MongoClient from "mongodb/lib/mongo_client";
import mongo from "mongodb";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());
app.use(express.json());

let checkAttributes = (data) => {
  if (
    !data.nick ||
    !data.mail ||
    !data.lastFeedingDate ||
    !data.InsideTemperature ||
    !data.OutsideTemperature
  ) {
    return false;
  }
  return true;
};

app.get("/", (req, res) => {
  res.json({});
});

app.get("/beehives", async (req, res) => {
  let db = await connect();
  let query = req.query;

  let selekcija = {};
  if (query.mail) {
    selekcija.mail = query.mail;
  }
  console.log(selekcija);

  let cursor = await db.collection("beehives").find(selekcija);

  let results = await cursor.toArray();

  res.json(results);
});
app.get("/beehives/:id", async (req, res) => {
  let id = req.params.id;
  let db = await connect();

  let result = await db
    .collection("beehives")
    .findOne({ _id: mongo.ObjectId(id) });

  res.json(result);
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
  // login
  let user = req.body;

  try {
    let result = await auth.loginFn(user.mail, user.password);
    res.json(result);
  } catch (e) {
    res.status(403).json({ error: e.message });
  }

  res.send(user);
});

app.post("/beehives", async (req, res) => {
  // used to set beehive details
  let data = req.body;

  delete data._id;

  if (
    !data.nick ||
    !data.mail ||
    !data.lastFeedingDate ||
    !data.InsideTemperature ||
    !data.OutsideTemperature
  ) {
    res.json({
      status: "fail",
      reason: "incomplete",
    });
    return;
  }

  let db = await connect();

  let result = await db.collection("beehives").insertOne(data);

  if (result && result.insertedCount == 1) {
    res.json("all ok");
  } else {
    res.json({
      status: "fail",
    });
  }
});

app.put("/beehives/:id", async (req, res) => {
  // used to set beehive details
  let id = req.params.id;
  let data = req.body;

  console.log(data);

  // let check = checkAttributes(data);

  // if (!check) {
  //   res.json({
  //     status: "fail",
  //     reason: "incomplete",
  //   });
  //   return;
  // }

  let db = await connect();

  let result = await db
    .collection("beehives")
    .replaceOne({ _id: mongo.ObjectId(id) }, data);

  if (result && result.modifiedCount == 1) {
    res.json({ status: "success" });
  } else {
    res.json({
      status: "fail",
    });
  }
});

app.listen(port, () => console.log(`Backend port -> ${port}!`));
