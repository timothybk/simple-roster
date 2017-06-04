var CountInstance = require('../models/countinstance');
var FireFighter = require('../models/firefighter');

var async = require('async');

// Display list of all CountInstances
exports.countinstance_list = function(req, res) {
    res.send('NOT IMPLEMENTED: CountInstance list');
};

// Display detail for specific CountInstances
exports.countinstance_detail = function(req, res, next) {
    CountInstance.findById(req.params.id)
        .populate('firefighter')
        .exec(function(err, countinstance) {
            if (err) {
                return next(err);
            }
            //success so render
            res.render('countinstance_detail', { title: 'FireFighter:', countinstance: countinstance });
        });
};

// Display CountInstance create on GET
exports.countinstance_create_get = function(req, res, next) {
    FireFighter.find({}, 'name')
        .exec(function(err, firefighters) {
            if (err) {
                return next(err);
            }
            //successful fo render
            res.render('countinstance_form', { title: 'Create CountInstance', firefighter_list: firefighters });
        });
};

// Handle CountInstance create on POST
exports.countinstance_create_post = function(req, res, next) {
    req.checkBody('date', 'Invalid date').isDate();
    req.checkBody('firefighter', 'FireFighter must be specified').notEmpty();
    req.checkBody('pump', 'Pump must be specified').notEmpty();
    req.checkBody('shift', 'Shift must be specified').notEmpty();

    req.sanitize('date').toDate();
    req.sanitize('firefighter').escape();
    req.sanitize('pump').escape();
    req.sanitize('shift').escape();
    req.sanitize('firefighter').trim();
    req.sanitize('pump').trim();
    req.sanitize('shift').trim();
    req.sanitize('md').escape();

    

    var countinstance = new CountInstance({
        date: req.body.date,
        firefighter: req.body.firefighter,
        pump: req.body.pump,
        shift: req.body.shift,
        md: req.body.md
    });

    var countinstancetwo = new CountInstance({
        date: req.body.date,
        firefighter: req.body.firefighter,
        pump: req.body.pump,
        shift: req.body.shift,
        md: true
    });

    var errors = req.validationErrors();
    if (errors) {
        FireFighter.find({}, 'name')
            .exec(function(err, firefighters) {
                if (err) {
                    return next(err);
                }
                //successful fo render
                res.render('countinstance_form', { title: 'Create CountInstance', firefighter_list: firefighters, countinstance: countinstance, errors: errors });
            });
        return;
    } else {
        //Data from form is valid
        async.parallel({
            instanceone: function(callback) {
                countinstance.save(callback)
            },
            instancetwo: function(callback) {
                countinstancetwo.save(callback)
            },
        }, function(err, results) {
            if (err) {
                return next(err);
            }
            res.redirect('countinstance_detail', {})
        });

    };
};

// Display CountInstance delete on GET
exports.countinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: CountInstance delete GET');
};

// Handle CountInstance delete on POST
exports.countinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: CountInstance delete POST');
};

// Display CountInstance update on GET
exports.countinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: CountInstance update GET');
};

// Handle CountInstance update on POST
exports.countinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: CountInstance update POST');
};
