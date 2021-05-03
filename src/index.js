import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({})
})

app.get('/beehives', (req, res) => {
    // used to get beehive data


    res.send({})
})

app.get('/users', (req, res) => {
    // used to get user details
    let userlist = storage.users;

    // console.log("Ok!");
    let doc = req.body;

    res.json(userlist);
})

app.post('/users', (req, res) => {
    // used to set user details
    let userlist = storage.users;
    let query = req.query;

    // console.log("Ok!");
    let doc = req.body;

    res.json(doc);
})

app.post('/beehives', (req, res) => {
    // used to set beehive details

    console.log("Ok!");
    let doc = req.body;

    res.json(doc);
})

app.listen(port, () => console.log(`Backend port -> ${port}!`))