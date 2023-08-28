const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static(__dirname + "/uploads"));

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
