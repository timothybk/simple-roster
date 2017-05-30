var Qualification = require('../models/qualification');

// Display list of all Qualification
exports.qualification_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Qualification list');
};

// Display detail page for a specific Qualification
exports.qualification_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Qualification detail: ' + req.params.id);
};

// Display Qualification create form on GET
exports.qualification_create_get = function(req, res, next) {
    res.render('qualification_form', { title: 'Create Qualification' });
};

// Handle Qualification create on POST
exports.qualification_create_post = function(req, res, next) {

    //check that the name field is not empty
    req.checkBody('name', 'Genre name required').notEmpty();

    //trim and escape the name field
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    //run the validators
    var errors = req.validationErrors();

    //Create a genre object with escaped and trimmed data
    var genre = new Genre({
        name: req.body.name
    });

    if (errors) {
        //If there are errors render the form again, passing previously entered values and errors
        res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors });
        return;
    }// continue adding from here (begin line 24 of genre controller post route https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms)
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
