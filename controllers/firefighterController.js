var FireFighter = require('../models/firefighter');

exports.index = function (req, res, next) {
	res.send('NOT IMPLEMENTED: Site Home Page');
}

//Display list of ff
exports.firefighter_list = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter list');
};

//Display detail page for a specific ff
exports.firefighter_detail = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter detail' + req.params.id);
};

//Display ff create form on GET
exports.firefighter_create_get = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter create GET');
};

//Handle ff create on POST
exports.firefighter_create_post = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter create POST');
};

//Display ff delete form on GET
exports.firefighter_delete_get = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter delete GET');
};

//Handle ff delete on POST
exports.firefighter_delete_post = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter delete POST');
};

//Display ff update form on GET
exports.firefighter_update_get = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter update GET');
};

//Handle ff update on POST
exports.firefighter_update_post = function (req, res) {
	res.send('NOT IMPLEMENTED: firefighter update POST');
};