var FireFighter = require('../models/firefighter');
var Qualification = require('../models/qualification');
var CountInstance = require('../models/countinstance');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        firefighter_count: function(callback) {
            FireFighter.count(callback);
        },
        qualification_count: function(callback) {
            Qualification.count(callback);
        },
        countinstance_count: function(callback) {
            CountInstance.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Simple Roster Home', error: err, data: results });
    });
};

//Display list of ff
exports.firefighter_list = function(req, res, next) {
    
    FireFighter.find({}, 'name qualifications')
    .populate('qualifications')
    .exec(function (err, list_firefighter) {
    	if (err) {return next(err);}
    	res.render('firefighter_list', {title: 'FireFighter List', firefighter_list: list_firefighter});
    });
};

//Display detail page for a specific ff
exports.firefighter_detail = function(req, res, next) {
    
    async.parallel({
    	firefighter: function(callback){

    		FireFighter.findById(req.params.id)
    		.populate('qualifications')
    		.exec(callback);
    	},

    	countinstance: function(callback){
    		CountInstance.find({'firefighter': req.params.id})
    		.populate('firefighter')
    		.sort('-date')
    		.exec(callback);
    	},
    }, function (err, results) {
    	if (err) {return next(err);}
    	res.render('firefighter_detail', {title: 'FireFighter', firefighter: results.firefighter, countinstance_list: results.countinstance});
    })
    // FireFighter.findById(req.params.id)
    // .populate('qualifications')
    // .exec(function (err, firefighter) {
    // 	if (err) {return next(err);}
    // 	res.render('firefighter_detail', {title: 'FireFighter', firefighter: firefighter});
    // });
};

//Display ff create form on GET
exports.firefighter_create_get = function(req, res, next) {

    //get all qualifications
    Qualification.find({}, 'name')
        .exec(function(err, qualifications) {
            if (err) {
                return next(err); }
            //successful, so render
            res.render('firefighter_form', { title: 'Create FireFighter', qualification_list: qualifications });
        });
};

//Handle ff create on POST
exports.firefighter_create_post = function(req, res, next) {

    req.checkBody('number', 'Number must not be empty.').notEmpty();
    req.checkBody('rank', 'Rank must not be empty.').notEmpty();
    req.checkBody('name', 'Name must not be empty.').notEmpty();

    req.sanitize('number').escape();
    req.sanitize('rank').escape();
    req.sanitize('name').escape();
    req.sanitize('number').trim();
    req.sanitize('rank').trim();
    req.sanitize('name').trim();
    req.sanitize('qualification').escape();

    var firefighter = new FireFighter({
        number: req.body.number,
        rank: req.body.rank,
        name: req.body.name,
        qualifications: (typeof req.body.qualification === 'undefined') ? [] : req.body.qualification.split(",")
    });

    console.log('FIREFIGHTER: ' + firefighter);

    var errors = req.validationErrors();
    if (errors) {
        //some problems so form neads to be rerendered
        Qualification.find({}, 'name')
            .exec(function(err, qualifications) {
                if (err) {
                    return next(err);
                }
                //mark selected qualifications as checked
                for (i = 0; i < qualifications.length; i++) {
                    if (firefighter.qualifications.indexOf(qualifications[i]._id > -1)) {
                        //Current qualifications is selected. Set 'checked' flag.
                        qualifications[i].checked = 'true';
                    }
                }
                res.render('firefighter_form', { title: 'Create FireFighter', qualification_list: qualifications, firefighter: firefighter, errors: errors });
            });
    } else {
        //data from form is valid
        firefighter.save(function(err) {
            if (err) {
                return next(err);
            }
            //redirect to new ff record
            res.redirect(firefighter.url);
        });
    }
};

//Display ff delete form on GET
exports.firefighter_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: firefighter delete GET');
};

//Handle ff delete on POST
exports.firefighter_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: firefighter delete POST');
};

//Display ff update form on GET
exports.firefighter_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: firefighter update GET');
};

//Handle ff update on POST
exports.firefighter_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: firefighter update POST');
};
