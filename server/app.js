const express = require('express');
var morgan = require('morgan');
var axios = require('axios');
var bodyParser = require('body-parser');

const app = express();
app.use(morgan());
app.use(bodyParser.json());
//declare cache attributes before using them:
var cache = {
    url: '',
    data: ''
};

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', function(req,res) {
    //if req.url == cache.url show the user cache.data
    if (req.url == cache.url) {
        res.send(cache.data);
    } else {
        //otherwise go get omdb data
        axios.get('http://www.omdbapi.com'+ req.url + '&apikey=8730e0e')
        .then(function(r) {
        //since they haven't gotten this data twice, save it to cache before response (otherwise we will)

            cache.url = req.url;
            cache.data = r.data;
            res.json(r.data);
            
    })    
    .catch(function(e) {
        res.send(e.message);
    });
}
});



module.exports = app;