

var Contact = require('../model/contacts');


exports.findByNumber = function(model, _primarycontactnumber, response){
	console.log("INside find by number." + _primarycontactnumber);
	model.find({primarycontactnumber: _primarycontactnumber},
		function(error, result){
			console.log("Result: " + result);
			if(error){
				console.error(error);
				response.writeHead(500, 
					{'Content-Type': 'text/plain'});
				response.end('Internal Server Error');
				return;
			} else{
				if(!result){
					if(response != null){
						response.writeHead(400, {'Content-Type': 'text/plain'});
						response.end('Not found');
					}
					return;
				}
			}
			if(response != null){
				response.setHeader('Content-Type', 'application/json');
				response.send(result);
			}
			console.log(result);
		}
		);
}

exports.findByName = function(model, _name, response){
	console.log("Find by name");
	model.findOne({firstname: _name},
		function(error, result){
			if(error){
				console.error(error);
				response.writeHead(500, 
					{'Content-Type': 'text/plain'});
				response.end('Internal Server Error');
				return;
			} else{
				if(!result){
					if(response != null){
						response.writeHead(400, {'Content-Type': 'text/plain'});
						response.end('Not found');
					}
					return;
				}
			}
			if(response != null){
				response.setHeader('Content-Type', 'application/json');
				response.send(result);
			}
			console.log(result);
		}
		);
}

exports.list = function(model, response){
	model.find({}, function(error, result){
		if(error){
			console.error(error);
			return null;
		}
		if (response != null){
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(result));
		}
		return JSON.stringify(result);
	});
}

exports.create = function(model,requestBody, response){
	var contact = toContact(requestBody, model);
	var primarynumber = requestBody.primarycontactnumber;
	contact.save(function(error){
		if(!error){
			contact.save();
		}
		else{
			console.log("Checking if it fail due to primary:" + primarynumber);
			model.findOne({primarycontactnumber: primarynumber},
				function(error, data){
					if(error){
						console.log(error);
						if(response != null){
							response.writeHead(500, 
							{'Content-Type': 'text/plain'});
							response.end('Internal Server Error');
						}
						return;
					}else{
						var contact = toContact(requestBody, model);
						if(!data){
							console.log("The contact not exist wil be created.");
							contact.save(function(error){
								if(!error){
									contact.save();
								}else{
									console.log(error);
								}

							});

							if(response != null){
								response.writeHead(201, {'Content-Type': 'text/plain'});
								response.end("created");
							}
							return;
						}else{
							console.log("updating contact with primarynumber:" +
								primarynumber);
							data.firstname =  contact.firstname;
							data.lastname = contact.lastname;
							data.title = contact.title;

							data.save(function(error){
								if(!error){
									data.save();
									response.end("Updated");
									console.log("Data succesfully updated");

								}else{
									console.log("Error while updating contact");
									console.log("Error");
								}
							});
						}
					}

				});

		}
	});
}

exports.query_by_args = function(model, key, value, response){
	console.log("Query by args");
	var filterArg = '{\"' + key + '\":' +'\"' + value  + '\"}';
	var filter = JSON.parse(filterArg);
	model.find(filter, 	function(error, result){
		if(error){
			console.log(error);
			response.writeHead(500, {'Content-Type': 'text/plain'});
			response.end('Internal server error');
			return;
		}else{
			if(!result){
				if(response != null){
					response.writeHead(404, {'Content-Type': 'text/plain'});
					response.end('Not found');
				}
				return;
			}
			if (response != null) {
				response.setHeader("Content-Type", 'application/json');
				response.send(result);
			}
		}
	});
}

function toContact(body, model){
	return new Contact({
		firstname: body.firstname,
		lastname: body.lastname,
		title: body.title,
		company: body.company,
		jobtitle: body.jobtitle,
		primarycontactnumber: body.primarycontactnumber,
		primaryemailaddress: body.primaryemailaddress,
		emailaddresses: body.emailaddresses,
		groups: body.groups,
		othercontactnumbers: body.othercontactnumbers

	});

}