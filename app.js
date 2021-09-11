var express = require("express");
var exphbs = require("express-handlebars");

var app = express();
PORT=3000

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    res.render("home");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
