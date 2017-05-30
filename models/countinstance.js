var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CountInstanceSchema = Schema({
	firefighter: {type: Schema.ObjectId, ref: 'FireFighter'},
	pump: String,
	count: Number
});

//virtual for CountInstance URL
CountInstanceSchema
.virtual('url')
.get(function () {
	return '/catalog/countinstance/' + this._id;
});

//export model
module.exports = mongoose.model('CountInstance', CountInstanceSchema);