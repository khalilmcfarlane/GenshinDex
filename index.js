const express = require("express");
const path = require('path');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("index");
})

app.listen(port, () => {
    console.log(`Now listening at port ${port}.`);
})