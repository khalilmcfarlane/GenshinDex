const express = require("express");
const path = require('path');
const { testAllChar, getCharacterbyName } = require("./app/js/genshin");
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    const allCharacters = await testAllChar();
    //console.log(allCharacters);
    res.render("index", {allCharacters});
})


app.get('/characters/:characterName', (req, res) => {
    // Send in character id to character.ejs
    const name = req.params[characterName].toLowerCase();
    const characterDetails = getCharacterbyName(name);
    res.render("character", {characterDetails});
})

app.listen(port, () => {
    console.log(`Now listening at port ${port}.`);
})