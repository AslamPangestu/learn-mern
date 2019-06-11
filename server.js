//import liblary
const express = require("express"); //backend
const mongoose = require("mongoose"); //mongodb driver
const path = require("path");
const config = require("config");

//initiation
const app = express();

//Bodyparser Middleware
app.use(express.json());

//DB Config
// const uri = require("./config/keys").mongoURI;
const uri = config.get("mongoURI");

//Connect to mongo
mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/v1/items", require("./routes/api/items"));
app.use("/api/v1/users", require("./routes/api/users"));
app.use("/api/v1/auth", require("./routes/api/auth"));

// Serve Static assets in prod
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000; //port
app.listen(port, () => console.log(`Server run on port ${port}`));
