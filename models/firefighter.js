var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FireFighterSchema = Schema({
    number: Number,
    rank: String,
    name: String,
    quals: [{type: Schema.ObjectId, ref: 'Qualification'}]
    
    });

//virtual for ff's URL
FireFighterSchema
.virtual('url')
.get(function () {
	return '/catalog/firefighter/' + this._id;
})

module.exports = mongoose.model('FireFighter', FireFighterSchema);
