// configurations file to keep all the global variables there, eg. db-name, APP name, etc
require('dotenv').config({path: '.env'});

//----------------------- All the required packages are indicated under this section
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
//-----------------------


// Home Page
app.get('/', (req, res) => {
    res.render('main/home', {

    });
});

// Post data from the frontend, the main backend logic implemented help by this page
app.post('/itunes-search', async (req, res) => {
    const SIMPLE_SEARCH = 'simple';
    const ALPHABETIC_SEARCH = 'alphabetically';

    // Initial state of response, will return this if no result search result found
    let response = {
        resultCount: 0,
        results: []
    };

    // Request data: the entered text and the type of button clicked from frontend
    const {search, type} = req.body;

    // Before doing the search deleting the previous search result
    await itunesData.deleteAll();

    // storing the new search result when the delete process completed successfully
    await storeData(search, 500);

    // check type for sorting the data if it's needed
    if (type === ALPHABETIC_SEARCH) {
        response = await itunesData.getByNameAlphabeticData(search, 50);
    } else {
        response = await itunesData.getByName(search, 50);
    }

    // return response wiht JSON
    res.send(JSON.stringify(response));
});


/**
 * Store API's data
 *
 * @param search
 * @param limit
 * @returns {Promise<void>}
 */
const storeData = async (search, limit) => {
    const searchOptions = new itunesAPI.ItunesSearchOptions({
        limit: limit,
        term: search, // All searches require a single string query.
    });

    // the call to Itunes
    const {resultCount, results} = await itunesAPI.searchItunes(searchOptions);

    if (!resultCount) {
        return; // no result found
    }

    await itunesData.store(results);
};

// Listing on the port of pointed on .ENV file
app.listen(process.env.NODE_PORT, () => console.log('listening on *:' + process.env.NODE_PORT));