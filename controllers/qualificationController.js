var Qualification = require('../models/qualification');
var FireFighter = require('../models/firefighter');

var async = require('async');

// Display list of all Qualification
exports.qualification_list = function(req, res, next) {
    
    Qualification.find({}, 'name')
    .exec(function (err, list_qualifications) {
        if (err) {return next(err)};
        res.render('qualification_list', {title: 'Qualification List', list_qualifications: list_qualifications});
    });
};

// Display detail page for a specific Qualification
exports.qualification_detail = function(req, res, next) {
    
    async.parallel({
        qualification: function(callback) {
            Qualification.findById(req.params.id)
            .exec(callback);
        },

        qualification_firefighters: function (callback) {
            FireFighter.find({'qualifications': req.params.id})
            .populate('qualifications')
            .exec(callback);
        },
    }, function (err, results) {
        if (err) {return next(err);}
        res.render('qualification_detail', {title: 'Qualification Detail', qualification: results.qualification, qualification_firefighters: results.qualification_firefighters});
    });
};

// Display Qualification create form on GET
exports.qualification_create_get = function(req, res, next) {
    res.render('qualification_form', { title: 'Create Qualification' });
};

// Handle Qualification create on POST
exports.qualification_create_post = function(req, res, next) {

    //check that the name field is not empty
    req.checkBody('name', 'Qualification name required').notEmpty();

    //trim and escape the name field
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    //run the validators
    var errors = req.validationErrors();

    //Create a qualification object with escaped and trimmed data
    var qualification = new Qualification({
        name: req.body.name
    });

    if (errors) {
        //If there are errors render the form again, passing previously entered values and errors
        res.render('qualification_form', { title: 'Create Qualification', qualification: qualification, errors: errors });
        return;
    } else {
        //data form is valid
        //check Qualification with same name already exists
        Qualification.findOne({ 'name': req.body.name })
            .exec(function(err, found_qualification) {
                console.log('found_qualification: ' + found_qualification);
                if (err) {
                    return next(err); }

                if (found_qualification) {
                    //Qualification exists, redirect to detail page
                    res.redirect(found_qualification.url);
                } else {
                    qualification.save(function(err) {
                        if (err) {
                            return next(err); }
                        //Qualification saved. Redirect to qualification detail page
                        res.redirect(qualification.url);
                    });
                }
            });
    }
};

// Display Qualification delete form on GET
exports.qualification_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Qualification delete GET');
};

// Handle Qualification delete on POST
exports.qualification_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Qualification delete POST');
};

// Display Qualification update form on GET
exports.qualification_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Qualification update GET');
};

// Handle Qualification update on POST
exports.qualification_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Qualification update POST');
};
