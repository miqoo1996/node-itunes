require('dotenv').config({path: '.env'});

let url = require( 'url' );
const http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();


const itunesAPI = require("node-itunes-search");
const bodyParser = require('body-parser');

const itunesData = require('./models/itunesData');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/assets/'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('main/home', {

    });
});

app.post('/itunes-search', async (req, res) => {
    const SIMPLE_SEARCH = 'simple';
    const ALPHABETIC_SEARCH = 'alphabetically';

    let response = {
        resultCount: 0,
        results: []
    };

    const {search, type} = req.body;

    await itunesData.deleteAll();

    await storeData(search, 500);

    if (type === ALPHABETIC_SEARCH) {
        response = await itunesData.getByNameAlphabeticData(search, 50);
    } else {
        response = await itunesData.getByName(search, 50);
    }

    res.send(JSON.stringify(response));
});


const storeData = async (search, limit) => {
    const searchOptions = new itunesAPI.ItunesSearchOptions({
        limit: limit,
        term: search, // All searches require a single string query.
    });

    const {resultCount, results} = await itunesAPI.searchItunes(searchOptions);

    if (!resultCount) {
        return;
    }

    await itunesData.store(results);
};

app.listen(process.env.NODE_PORT, () => console.log('listening on *:' + process.env.NODE_PORT));