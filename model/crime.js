var mongoose = require('mongoose');

var crimeSchema = new mongoose.Schema({
	date: String,
	state: String,
	city: String,
	day: String,
	hour: String,
	neighbourhood: String,
	zone: String,
	site_class: String,
	weapon_used: String,
	mobility_agresor: String,
	mobility_victim: String,
	age: String,
	gender: String,
	marital_status: String,
	country_origin: String,
	kind_employee: String,
	occupation: String,
	scholarship: String
});

module.exports = mongoose.model('Crime', crimeSchema);