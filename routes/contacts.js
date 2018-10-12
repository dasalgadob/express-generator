var express = require('express');
var router = express.Router();
var url = require('url');
var contacts = require('../modules/contacts');
var dataservice = require('../modules/contactdataservice');
var Contact = require('../model/contacts');


router.get('/:number', function(request, response) {
//response.setHeader('content-type', 'application/json');
console.log("Quering: " + request.url + "  " + request.params.number);
dataservice.findByNumber(Contact, request.params.number, response);
//response.end(JSON.stringify(contacts.query(request.params.
//number)));
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var getParams = url.parse(req.url, true).query;
    if(Object.keys(getParams).length == 0){
        dataservice.list(Contact, res);
    }else{
        var key = Object.keys(getParams)[0];
        var value = getParams[key];
        JSON.stringify(dataservice.query_by_args(Contact, key, value, res));

    }
    //dataservice.list(Contact, res);
});


router.post('/', function(req, res){
    dataservice.create(Contact, req.body, res);
});



/*
router.get('/:name', function(request, response) {
//response.setHeader('content-type', 'application/json');
dataservice.findByName(Contact, request.params.name, response);
//response.end(JSON.stringify(contacts.query(request.params.
//number)));
});
*/
module.exports = router;
