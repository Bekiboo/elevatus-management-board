// Get dependencies
var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morganLogger = require("morgan");
var mongoose = require("mongoose");

// ROUTING FILES
var index = require("./server/routes/app"); // Default route
const childRoutes = require("./server/routes/children");
const postRoutes = require("./server/routes/posts");

var app = express(); // create an instance of express

// parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(cookieParser());

app.use(morganLogger("dev")); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, "dist/cms")));

// ------------------------------ ROUTES ------------------------------
app.use("/", index); // Default route
app.use("/children", childRoutes);
app.use("/posts", postRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/cms/index.html"));
});

mongoose.connect(
  "mongodb://localhost:27017/cms",
  { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      console.log("Connection failed: " + err);
    } else {
      console.log("Connected to database!");
    }
  }
);

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, function () {
  console.log("API running on localhost: " + port);
});
