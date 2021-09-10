import express from "express";
import storage from "./memory_storage.js";
import cors from "cors";
import connect from "./db.js"

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({});
});

app.get("/beehives", async (req, res) => {
  let db = await connect()
  let cursor =  await db.collection("beehives").find({})
})

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

app.post("/users", (req, res) => {
  // used to set user details
});

app.post("/beehives", (req, res) => {
  // used to set beehive details
});

app.listen(port, () => console.log(`Backend port -> ${port}!`));
