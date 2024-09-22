const express = require("express");
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("Hello!");
})

app.listen(port, () => {
    console.log(`Now listening at port ${port}.`);
})