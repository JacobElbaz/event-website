"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var routes = _express["default"].Router();

var port = process.env.PORT || 4000;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use("/guests", routes);

_dotenv["default"].config();

var public_path = _path["default"].join(__dirname, '../build');

app.use(_express["default"]["static"](public_path));
app.get('*', function (_, res) {
  res.sendFile(_path["default"].join(public_path, 'index.html'));
});
var uri = process.env.STRING_URI;
var client = new _mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: _mongodb.ServerApiVersion.v1
});
routes.get("/", function (_, res) {
  client.connect(function (err, db) {
    console.log("connecté avec succès à la db");

    if (err || !db) {
      return false;
    }

    db.db("event-website").collection("guests").find().toArray(function (err, results) {
      if (!err) {
        res.status(200).send(results);
      }
    });
  });
});
routes.post("/insert", function (req, res) {
  client.connect(function (err, db) {
    console.log("connecté avec succès à la db");

    if (err || !db) {
      return false;
    }

    db.db("event-website").collection("guests").findOne({
      phone: req.body.phone
    }, function (err, results) {
      if (!err && results) {
        console.log("found !");
        db.db("event-website").collection("guests").updateOne({
          phone: req.body.phone
        }, {
          $set: {
            name: req.body.name,
            numberOfGuests: req.body.numberOfGuests
          }
        }).then(function () {
          return db.db("event-website").collection("guests").find().toArray();
        }).then(function (records) {
          return res.status(200).send(records);
        })["catch"](function () {
          return res.status(400).send(err);
        });
      } else {
        db.db("event-website").collection("guests").insertOne(req.body).then(function () {
          return db.db("event-website").collection("guests").find().toArray();
        }).then(function (records) {
          return res.status(200).send(records);
        })["catch"](function () {
          return res.status(400).send(err);
        });
      }
    });
  });
});
routes.put("/:id", function (req, res) {
  client.connect(function (err, db) {
    if (err || !db) {
      return false;
    }

    db.db("event-website").collection("guests").updateOne({
      _id: (0, _mongodb.ObjectId)(req.params.id)
    }, {
      $set: {
        name: req.body.name,
        numberOfGuests: req.body.numberOfGuests,
        phone: req.body.phone
      }
    }).then(function () {
      return db.db("event-Website").collection("guests").find().toArray();
    }).then(function (records) {
      return res.status(200).send(records);
    })["catch"](function () {
      return res.status(400).send(err);
    });
  });
});
routes["delete"]("/:id", function (req, res) {
  client.connect(function (err, db) {
    if (err || !db) {
      return false;
    }

    db.db("event-website").collection("guests").deleteOne({
      _id: (0, _mongodb.ObjectId)(req.params.id)
    }).then(function () {
      return db.db("event-website").collection("guests").find().toArray();
    }).then(function (records) {
      return res.status(200).send(records);
    })["catch"](function () {
      return res.status(400).send(err);
    });
  });
});
app.listen(port, function () {
  console.log("serveur démarré avec succès sur le port 4000");
});