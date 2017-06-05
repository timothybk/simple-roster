var CountInstance = require('../models/countinstance');
var FireFighter = require('../models/firefighter');
var Appliance = require('../models/appliance')

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

    var firefighterResult;
    var applianceResult;
    var countResult = [];
    var fullCountResult;
    async.series([
        function(callback) {
            FireFighter.find({}, 'name qualifications')
                .populate('qualifications')
                .exec(function(err, result) {
                    if (err) { callback(err); }
                    firefighterResult = result;
                    callback();
                })

        },
        function(callback) {
            Appliance.find({}, 'name qualifications seats firefighter')
                .populate('qualifications')
                .exec(function(err, result) {
                    if (err) { callback(err); }
                    applianceResult = result;
                    callback();
                })

        },
        function(callback) {
            var i = 0;
            async.forEachOf(applianceResult, function(value, key, callback) {
                CountInstance.find({ 'pump': applianceResult[key].name })
                    .where('firefighter').equals(firefighterResult[0])
                    .populate('firefighter')
                    .exec(function(err, result) {
                        if (err) { callback(err); }
                        countResult.push(result);
                        i++;
                        callback();
                    });

            }, function(err) {
                if (err) { callback(err); }
                console.log(countResult)
                callback();
            })
        },
        function(callback) {
            // for (var i = 0; i < countResult.length; i++) {
            //     for (var j = 0; j < firefighterResult.length; j++) {
            //         CountInstance.find({'firefighter': firefighterResult[i].name})
            //         .exec(function (err, result) {
            //             fullCountResult = result;
            //             console.log(fullCountResult[i].firefighter)
            //         })
            //     }
            // }
            callback();
        }


    ], function(err, results) {
        if (err) {
            return next(err);
        }
        res.render('countinstance_form', {
            title: 'Create CountInstance',
            firefighter_list: firefighterResult,
            appliance_list: applianceResult
        });
    });
};

// Handle CountInstance create on POST
exports.countinstance_create_post = function(req, res, next) {


    var appliance_arr = [];
    var countinstance_array = [];


    async.series([
        function(callback) {
            Appliance.find({}, 'name seats')
                .exec(function(err, appliances) {
                    if (err) {
                        return next(err);
                    }
                    appliance_arr = appliances
                    callback();

                });

        },

        function(callback) {
            req.checkBody('date', 'Invalid date').isDate();

            for (var i = 0; i < appliance_arr.length; i++) {
                for (var j = 0; j < appliance_arr[i].seats.length; j++) {
                    req.checkBody(appliance_arr[i].name + appliance_arr[i].seats[j], appliance_arr[i].name + '' +
                        appliance_arr[i].seats[j] + 'must be specified').notEmpty();
                }

            }

            req.checkBody('shift', 'Shift must be specified').notEmpty();
            req.sanitize('date').toDate();

            for (var i = 0; i < appliance_arr.length; i++) {
                for (var j = 0; j < appliance_arr[i].seats.length; j++) {
                    req.sanitize(appliance_arr[i].name + appliance_arr[i].seats[j]).escape();
                    req.sanitize(appliance_arr[i].name + appliance_arr[i].seats[j]).trim();
                }
            }

            req.sanitize('shift').escape();
            req.sanitize('shift').trim();
            req.sanitize('md').escape();

            var total = 0;


            for (var i = 0; i < appliance_arr.length; i++) {
                for (var j = 0; j < appliance_arr[i].seats.length; j++) {
                    var isMD = false;
                    if (appliance_arr[i].seats[j] == 'driver') {
                        isMD = true;
                    }

                    countinstance_array[total] = new CountInstance({
                        date: req.body.date,
                        firefighter: req.body[appliance_arr[i].name + appliance_arr[i].seats[j]],
                        pump: appliance_arr[i].name,
                        shift: req.body.shift,
                        md: isMD
                    });
                    total++;
                };
            }





            var errors = req.validationErrors();
            if (errors) {
                FireFighter.find({}, 'name')
                    .exec(function(err, firefighters) {
                        if (err) {
                            return callback(err);

                        }
                        //successful fo render
                        res.render('countinstance_form', { title: 'Create CountInstance', firefighter_list: firefighters, countinstance: countinstance, errors: errors });
                    });
                return;
            } else {
                //Data from form is valid
                async.each(countinstance_array, function(countinstance, callback) {
                    countinstance.save();
                    callback();
                }, function(err, results) {
                    if (err) {
                        return callback(err);
                    }
                });

            };
            callback();

        }
    ], function(err) {
        if (err) {
            return next(err);
        }
        console.log(appliance_arr);
        res.send('success')
    })
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
