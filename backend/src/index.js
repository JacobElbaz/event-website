import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
const app = express();
const routes = express.Router();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/guests", routes);
dotenv.config();

const public_path = path.join(__dirname, '../build');
app.use(express.static(public_path));
app.get('*', (_, res) => {
    res.sendFile(path.join(public_path, 'index.html'));
})

const uri = process.env.STRING_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

routes.get("/", (_, res) => {
    client.connect((err, db) => {
        console.log("connecté avec succès à la db")
        if (err || !db) { return false }
        db.db("event-website").collection("guests").find().toArray(function (err, results) {
            if (!err) {
                res.status(200).send(results);
            }
        })
    });
})

routes.post("/insert", (req, res) => {
    client.connect((err, db) => {
        console.log("connecté avec succès à la db")
        if (err || !db) { return false }
        db.db("event-website").collection("guests").findOne({ phone: req.body.phone }, function (err, results) {
            if (!err && results) {
                console.log("found !");
                db.db("event-website").collection("guests").updateOne({ phone: req.body.phone }, { $set: { name: req.body.name, numberOfGuests: req.body.numberOfGuests } })
                    .then(() => db.db("event-website").collection("guests").find().toArray())
                    .then(records => res.status(200).send(records))
                    .catch(() =>
                        res
                            .status(400)
                            .send(err))
            }
            else {
                db.db("event-website").collection("guests").insertOne(req.body)
                    .then(() => db.db("event-website").collection("guests").find().toArray())
                    .then(records => res.status(200).send(records))
                    .catch(() =>
                        res
                            .status(400)
                            .send(err))
            }

        })

    })
})

routes.put("/:id", (req, res) => {
    client.connect((err, db) => {
        if (err || !db) { return false }
        db.db("event-website").collection("guests").updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: req.body.name, numberOfGuests: req.body.numberOfGuests, phone: req.body.phone } })
            .then(() => db.db("event-Website").collection("guests").find().toArray())
            .then(records => res.status(200).send(records))
            .catch(() =>
                res
                    .status(400)
                    .send(err))
    })
})

routes.delete("/:id", (req, res) => {
    client.connect((err, db) => {
        if (err || !db) { return false }
        db.db("event-website").collection("guests").deleteOne({ _id: ObjectId(req.params.id) })
            .then(() => db.db("event-website").collection("guests").find().toArray())
            .then(records => res.status(200).send(records))
            .catch(() =>
                res
                    .status(400)
                    .send(err))
    })
})

app.listen(port, () => {
    console.log("serveur démarré avec succès sur le port 4000")
})