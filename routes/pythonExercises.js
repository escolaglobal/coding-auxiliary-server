var express = require('express');
var router = express.Router();
var PythonExercisesController = require('../controllers/PythonExercisesController');
var resemble = require('node-resemble-js');

router.get('/list', function(req, res){
    PythonExercisesController.findAll(function(err, exercises){
        if (err){
            res.send(err);
            return;
        }
        res.send(exercises);
    });
});

/**
 * Get an exercise by ID
 */
router.get('/get', function(req, res){
    if(req.query.id != undefined){
        PythonExercisesController.getById(req.query.id, function(err, exercise){
            if (err){
                res.send(err);
                return;
            }
            res.send(exercise);
        });
    }
});

router.get('/compare', function(req, res){
    if(req.query.image1 != undefined && req.query.exercise_id != undefined){
        PythonExercisesController.getById(req.query.exercise_id, function(err, exercise){
            if (err){
                res.send(err);
                return;
            }
            if(exercise == null || exercise.validation_image == undefined || exercise.validation_image == null){
                res.send(404, "no image to compare with");
                return;
            }
            try{
                var base64Data = req.query.image1.replace(/^data:image\/png;base64,/, "");
                var base64Data2 = exercise.validation_image.replace(/^data:image\/png;base64,/, "");
                var img1 = new Buffer(base64Data,'base64');
                var img2 = new Buffer(base64Data2,'base64');
                var diff = resemble(img1).compareTo(img2).onComplete(function(data){
                    var result = data.misMatchPercentage;
                    res.send(result);
                });
            } catch (err)
            {
                res.send(err);
                return;
            }
        });
    }
});

router.get('/duplicate', function(req, res){
    if (req.query.edXid1 != undefined && req.query.edXid2 != undefined ) {
        PythonExercisesController.getByEdXId(req.query.edXid2, function (err, exercise) {
            if (err){
                res.send(err);
                return;
            }

            if(exercise != undefined)
            {
                res.redirect('wizard?edXid='+req.query.edXid2);
                return;
            }

            PythonExercisesController.duplicate(req.query.edXid1,req.query.edXid2, function (err, exercise) {
            if (err){
                res.send(err);
                return;
            }
                res.redirect('wizard?edXid='+req.query.edXid2);
            });
        });
        
    } else
    {
        res.send(404);
    }
});


router.get('/wizard', function(req, res){
    if (req.query.edXid != undefined) {
        PythonExercisesController.getByEdXId(req.query.edXid, function (err, exercise) {
            if (err){
                res.send(err);
                return;
            }
                res.render('pythonExercises/create', {
                    edXid: req.query.edXid,
                    exercise: exercise,
                    edit: exercise != undefined
                });
        });
    }else res.send("Missing edX id for exercise");
});

router.post('/wizard', function(req, res){
    PythonExercisesController.getByEdXId(req.body.id_edx, function (err, exercise) {
        if (err){
            res.status(500).send("Ocorreu um erro. Por favor tente novamente");
            return;
        }
        if(exercise != undefined){
            PythonExercisesController.update(req.body.id_edx, req.body, function(err, numAffected){
                if (err){
                    res.status(500).send("Ocorreu um erro. Por favor tente novamente");
                    return;
                }
                res.status(200).send("OK");
            });
        }else{
            var pythonExercise = PythonExercisesController.getInstance(req.body);


            PythonExercisesController.save(pythonExercise, function(err, savedExercise){
                if (err){
                    res.status(500).send("Ocorreu um erro. Por favor tente novamente");
                    return;
                }
                res.status(200).send("OK");
            });
        }
    });

});


router.get('/view', function(req, res) {
    if (req.query.id != undefined) {
        PythonExercisesController.getById(req.query.id, function (err, exercise) {
            if (err){
                res.send(err);
                return;
            }
            res.render('pythonExercises/view', {
                exercise: exercise,
                preview: false
            });
        });
    } else if (req.query.id_edx != undefined) {
        PythonExercisesController.getByEdXId(req.query.id_edx, function (err, exercise) {
            if (err){
                res.send(err);
                return;
            }
            res.render('pythonExercises/view', {
                exercise: exercise,
                preview: false
            });
        });
    }
});
module.exports = router;
