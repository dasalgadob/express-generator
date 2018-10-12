var Crime = require('../model/crime');

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



exports.create = function(model,requestBody, response){
	var crime = toCrime(requestBody, model);
	//var primarynumber = requestBody.primarycontactnumber;
	crime.save(function(error){
		if(!error){
			crime.save();
			if(response != null){
				response.writeHead(201, {'Content-Type': 'text/plain'});
				response.end("created");
			}
		}
		else{
			console.log(error);
		}
	});
}

exports.update = function(model, requestBody, response){
	var id = requestBody._id;
	model.findOne({ _id: id }, function(error, data){
		if(error){
			console.log(error);
			if(response != null){
				response.writeHead(500, {'Content-Type' : 'text/plain'});
				response.end('Internal server error');
			}
			return;
		}else {
			var crime = toCrime(requestBody, model);
			if(!data){
				console.log("Contact does not exist will be created.");
				crime.save(function(error){
					if(!error){
						contact.save();
					}
				});

				if(response != null){
					reponse.writeHead(201, {'Content-Type': 'text/plain'});
					reponse.end('Created');
				}
				return;
			}

			data.date = crime.date;
			data.state= crime.state;
			data.city= crime.city;
			data.day= crime.day;
			data.hour= crime.hour;
			data.neighbourhood= crime.neighbourhood;
			data.zone= crime.zone;
			data.site_class= crime.site_class;
			data.weapon_used= crime.weapon_used;
			data.mobility_agresor= crime.mobility_agresor;
			data.mobility_victim= crime.mobility_victim;
			data.age= crime.age;
			data.gender= crime.gender;
			data.marital_status= crime.marital_status;
			data.country_origin= crime.country_origin;
			data.kind_employee= crime.kind_employee;
			data.occupation= crime.occupation;
			data.scholarship= crime.scholarship;

			data.save(function(error){
				if(!error){
					console.log("Succesfully updated the data.");
					data.save();
				}else{

					console.log("Error on save.");
				}

			});

			if(response != null){
				//response.writeHead(200, {'Content-Type': 'text/plain'});
				response.send('updated');
			}
		}
	});
}


function toCrime(body, model){
	return new Crime({
	date: body.date,
	state: body.state,
	city: body.city,
	day: body.day,
	hour: body.hour,
	neighbourhood: body.neighbourhood,
	zone: body.zone	,
	site_class: body.site_class,
	weapon_used: body.weapon_used,
	mobility_agresor: body.mobility_agresor,
	mobility_victim: body.mobility_victim,
	age: body.age,
	gender: body.gender,
	marital_status: body.marital_status,
	country_origin: body.country_origin,
	kind_employee: body.kind_employee,
	occupation: body.occupation,
	scholarship: body.scholarship
	});

}//end toCrime