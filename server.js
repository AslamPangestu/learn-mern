//import liblary
const express = require("express"); //backend
const mongoose = require("mongoose"); //mongodb driver
const bodyParser = require("body-parser"); //get request from body

//import routes
const itemRoutes = require("./routes/api/items");

//initiation
const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const uri = require("./config/keys").mongoURI;

//Connect to mongo
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/v1/items", itemRoutes);

const port = process.env.PORT || 5000; //port
app.listen(port, () => console.log(`Server run on port ${port}`));
