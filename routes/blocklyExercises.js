var express = require('express');
var router = express.Router();
var BlocklyExercisesController = require('../controllers/BlocklyExercisesController');
var BlocksController = require('../controllers/BlocksController');
var resemble = require('node-resemble-js');

router.get('/list', function(req, res){
    BlocklyExercisesController.findAll(function(err, exercises){
        if (err) res.send(err);
        res.send(exercises);
    });
});

router.get('/duplicate', function(req, res){
    if (req.query.edXid1 != undefined && req.query.edXid2 != undefined ) {
        BlocklyExercisesController.getByEdXId(req.query.edXid2, function (err, exercise) {
            if (err){
                res.send(err);
                return;
            }

            if(exercise != undefined)
            {
                res.redirect('wizard?edXid='+req.query.edXid2);
                return;
            }

            BlocklyExercisesController.duplicate(req.query.edXid1,req.query.edXid2, function (err, exercise) {
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
        BlocksController.findAll(function (err, blocks) {
            BlocklyExercisesController.getByEdXId(req.query.edXid, function(err, exercise){
                res.render('blocklyExercises/create', {
                        exercise: exercise,
                        edit: exercise != undefined,
                        edXid: req.query.edXid,
                        blocks: blocks
                });
            });
        });
    }else res.send("Missing edX id for exercise");
});

router.post('/wizard', function(req, res){
    var attributes = {
        id_edx: req.body.id_edx,
        init_python_code: req.body.init_python_code,
        final_python_code: req.body.final_python_code,
        validation_python_code: req.body.validation_python_code,
        toolbox: req.body.toolbox,
        initial_state: req.body.initial_state,
        text: req.body.text,
        turtle: req.body.turtle || false,
        background_image_url: req.body.background_image_url,
        validation_image: req.body.validation_image
    };


    BlocklyExercisesController.getByEdXId(req.body.id_edx, function (err, exercise) {
        if (err){
            res.status(500).send("Ocorreu um erro. Por favor tente novamente");
            return;
        }
        if(exercise != undefined){
            BlocklyExercisesController.update(req.body.id_edx, req.body, function(err, numAffected){
                if (err){
                    res.status(500).send("Ocorreu um erro. Por favor tente novamente");
                    return;
                }
                res.status(200).send("OK");
            });
        }else{

            var blocklyExercise = BlocklyExercisesController.getInstance(attributes);
            BlocklyExercisesController.save(blocklyExercise, function(err, savedExercise){
                if (err){
                    res.status(500).send("Ocorreu um erro. Por favor tente novamente");
                    return;
                }
                res.status(200).send("OK");
            });
        }
    });

});

router.get('/preview',function(req,res){
    res.render('blocklyExercises/preview');

});


router.get('/view', function(req, res){
    if(req.query.id != undefined){
        BlocklyExercisesController.getById(req.query.id, function(err, exercise){
            if (err) res.send(err);
            res.render('blocklyExercises/view', {
                exercise: exercise
            });
        });
    } else if (req.query.id_edx != undefined) {
        BlocklyExercisesController.getByEdXId(req.query.id_edx, function (err, exercise) {
            if (err) res.send(err);
            res.render('blocklyExercises/view', {
                exercise: exercise
            });
        });
    }
});

router.get('/get-toolbox', function(req, res){
    BlocklyExercisesController.getById(req.query.id, function(err, exercise){
        if (err) res.send(err);
        BlocksController.findByIds(exercise.toolbox, function(err, blocks){
            if (err) res.send(err);
            else res.send(blocks);
        });
    });
})


router.get('/compare', function(req, res){
    if(req.query.image1 != undefined && req.query.exercise_id != undefined){
        BlocklyExercisesController.getById(req.query.exercise_id, function(err, exercise){
            if (err){
                console.log("error in image comparison");
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
                console.log(err);
                res.send(err);
                return;
            }
        });
    }
});
module.exports = router;
