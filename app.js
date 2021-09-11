var express = require("express");
var exphbs = require("express-handlebars");

var app = express();
PORT = 3000;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

//Routes
app.get("/", function (req, res) {
    res.render("home");
});

app.get("/test", function (req, res) {
    res.render("test");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
