var express = require('express');
var router = express.Router();
var url = require('url');
var contacts = require('../modules/contacts');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var get_params = url.parse(req.url, true).query;
    if (Object.keys(get_params).length == 0){
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(contacts.list()));
    }
    else{
        res.setHeader('content-type', 'application/json');
        res.end(JSON.
        stringify(
        contacts.query_by_arg(
        get_params.arg, get_params.value)
));
    }
});

router.get('/:number', function(request, response) {
response.setHeader('content-type', 'application/json');
response.end(JSON.stringify(contacts.query(request.params.
number)));
});


module.exports = router;
