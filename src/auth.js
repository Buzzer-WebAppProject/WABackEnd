import mongo from "mongodb";
import connect from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

(async () => {
  let db = await connect();
  await db.collection("users").createIndex({ mail: 1 }, { unique: true });
})();

export default {
  async registerFn(userData) {
    let db = await connect();

    let doc = {
      username: userData.username,
      mail: userData.mail,
      password: await bcrypt.hash(userData.password, 8),
    };

    try {
      let result = await db.collection("users").insertOne(doc);
      if (result && result.insertedId) {
        return result.insertedId;
      }
    } catch (e) {
      if (e.code == 11000) {
        throw new Error("Korisnik već postoji");
      }
    }
  },
  async loginFn(mail, password) {
    let db = await connect();
    let user = await db.collection("users").findOne({ mail: mail });

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      delete user.password;
      // izdavanje tokena
      let token = jwt.sign(user, process.env.JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "1 week", // svako koliko će se korisnik morati ulogirati
      });
      return {
        token,
        mail: user.mail,
      };
    } else {
      throw new Error("Cannot authenticate");
    }
  },
  verify(req, res, next) {
    try {
      let authorization = req.headers.authorization.split(" ");
      let type = authorization[0];
      let token = authorization[1];

      if (type !== "Bearer") {
        res.status(401).send();
        return false;
      } else {
        req.jwt = jwt.verify(token, process.env.JWT_SECRET);
        return next();
      }
    } catch (e) {
      return res.status(401).send();
    }
  },
};
