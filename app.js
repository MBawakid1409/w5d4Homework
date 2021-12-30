const express = require("express");
const app = express();

app.use(express.json());
const db = require("./db");
const User = require("./models/users");

app.get("/", (req, res) => {
  res.json("GET / is Working");
});

app.get("/users", (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
      res.status(200).json(data);
    }
  });
});

app.get("/users/biggerThan20", (req, res) => {
  // query.find( { marks: { $gte: 89 } } )
  User.find( { age: { $gte: 20 } }, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
    res.status(200).json(data);
    }
  });
});

//        /users/search/Gonba
app.get("/users/search/:fName", (req, res) => {
  // query.find( { marks: { $gte: 89 } } )
  User.find( { fName:req.params.fName }, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
    res.status(200).json(data);
    }
  });
});

app.post("/users", (req, res) => {
  User.create(req.body, function (err, newUser) {
    if (err) {
      console.log("Error", err);
      res.status(400).json("User validation Failed");
    } else {
      res.json("Success Create new user");
    }
  });
});

app.delete("/users/:fName", (req, res) => {
  // console.log(req.params);
  User.deleteOne({ fName: req.params.fName }, (err, deleteObj) => {
    if (err) {
      console.log("Error", err);
      res.status(500).json("DB Problem");
    } else {
      // console.log(deleteObj);
      if (deleteObj.deleteCount === 0) {
        res.status(404).json("User Not Found");
      } else {
        res.status(200).json("Success Delete " + req.params.fName);
      }
    }
  });
});

app.delete("/users/age/:sAge", (req, res) => {
  // console.log(req.params);
  User.deleteOne({ age: req.params.sAge }, (err, deleteObj) => {
    if (err) {
      console.log("Error", err);
      res.status(500).json("DB Problem");
    } else {
      // console.log(deleteObj);
      if (deleteObj.deleteCount === 0) {
        res.status(404).json("User Not Found");
      } else {
        res.status(200).json("Success Delete");
      }
    }
  });
});

app.put("/users/fName/:oldName", (req, res) => {
  console.log(req.params);
  User.updateOne(
    { fName: req.params.oldName },
    { fName: req.body.newName },
    (err, updateObj) => {
      if (err) {
        console.log("Error", err);
        res.status(500).json("there is a problem in DB");
      } else {
        console.log(updateObj);
        if (updateObj.matchedCount === 0) {
          res.status(404).json("User Not Found");
        } else {
          res.status(200).json("Success Update");
        }
      }
    }
  );
});

app.put("/users/favFood/:oldFood", (req, res) => {
  // console.log(req.params);
  User.updateOne(
    { favFood: req.params.oldFood },
    { favFood: req.body.newFood },
    (err, updateObj) => {
      if (err) {
        console.log("Error", err);
        res.status(500).json("there is a problem in DB");
      } else {
        // console.log(updateObj);
        if (updateObj.matchedCount === 0) {
          res.status(404).json("User Not Found");
        } else {
          res.status(200).json("Success Update");
        }
      }
    }
  );
});

// Extension prettier : alt + shift + F

app.listen(5000, () => {
  console.log("Server is Working ...");
});
