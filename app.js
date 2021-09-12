const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const path = require("path");

var app = express();

//Public
app.use(express.static(path.join(__dirname, "public")));

//Config
dotenv.config({ path: "./config/.env" });

//Handlebars
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs());

//Routes
app.get("/", function (req, res) {
    res.render("home");
});

app.get("/users", function (req, res) {
    res.render("users");
});

app.get("/test", function (req, res) {
    res.render("test");
});

//Port
const PORT =
    process.env.NODE_ENV == "developement"
        ? process.env.DEV_PORT
        : process.env.PORT;

app.listen(PORT, () => {
    console.log(
        `HTTPS_Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
    );
});
