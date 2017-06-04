var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var CountInstanceSchema = Schema({
	date: {type: Date, default: Date.now},
	firefighter: {type: Schema.ObjectId, ref: 'FireFighter'},
	pump: String,
	shift: String,
	md: Boolean
});

//virtual for CountInstance URL
CountInstanceSchema
.virtual('url')
.get(function () {
	return '/catalog/countinstance/' + this._id;
});

//virtual for moment reformatting of date
CountInstanceSchema
.virtual('date_formatted')
.get(function () {
	return moment(this.date).format('MMM Do, YYYY');
});

//export model
module.exports = mongoose.model('CountInstance', CountInstanceSchema);